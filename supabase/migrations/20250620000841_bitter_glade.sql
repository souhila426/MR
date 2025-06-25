/*
  # Système d'authentification et gestion des utilisateurs

  1. Tables principales
    - `user_profiles` - Profils utilisateurs étendus
    - `organizations` - Organisations/cabinets juridiques
    - `user_roles` - Rôles et permissions
    - `user_sessions` - Sessions utilisateurs actives

  2. Sécurité
    - RLS activé sur toutes les tables
    - Politiques d'accès basées sur les rôles
    - Audit trail pour les actions sensibles

  3. Fonctionnalités
    - Profils utilisateurs complets
    - Gestion des organisations
    - Système de rôles hiérarchiques
    - Suivi des sessions actives
*/

-- Extension pour UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table des organisations
CREATE TABLE IF NOT EXISTS organizations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL CHECK (type IN ('cabinet', 'entreprise', 'institution', 'individuel')),
  address text,
  phone text,
  email text,
  website text,
  logo_url text,
  subscription_plan text DEFAULT 'basic' CHECK (subscription_plan IN ('basic', 'premium', 'enterprise')),
  subscription_status text DEFAULT 'active' CHECK (subscription_status IN ('active', 'suspended', 'cancelled')),
  settings jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Table des rôles
CREATE TABLE IF NOT EXISTS user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  description text,
  permissions jsonb DEFAULT '[]',
  level integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Insérer les rôles par défaut
INSERT INTO user_roles (name, description, permissions, level) VALUES
('super_admin', 'Super Administrateur', '["all"]', 100),
('admin', 'Administrateur', '["manage_users", "manage_documents", "manage_settings"]', 90),
('manager', 'Gestionnaire', '["manage_documents", "view_analytics", "manage_team"]', 70),
('senior_lawyer', 'Juriste Senior', '["create_documents", "edit_documents", "view_analytics"]', 60),
('lawyer', 'Juriste', '["create_documents", "view_documents"]', 50),
('assistant', 'Assistant Juridique', '["view_documents", "create_notes"]', 30),
('viewer', 'Lecteur', '["view_documents"]', 10)
ON CONFLICT (name) DO NOTHING;

-- Table des profils utilisateurs
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  avatar_url text,
  phone text,
  address text,
  organization_id uuid REFERENCES organizations(id),
  role_id uuid REFERENCES user_roles(id),
  specializations text[] DEFAULT '{}',
  bio text,
  preferences jsonb DEFAULT '{}',
  notification_settings jsonb DEFAULT '{
    "email": true,
    "push": true,
    "sms": false,
    "newsletter": true
  }',
  privacy_settings jsonb DEFAULT '{
    "profile_visible": true,
    "activity_visible": false,
    "analytics_enabled": true
  }',
  last_login_at timestamptz,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Table des sessions utilisateurs
CREATE TABLE IF NOT EXISTS user_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  session_token text NOT NULL,
  ip_address inet,
  user_agent text,
  device_info jsonb,
  location_info jsonb,
  started_at timestamptz DEFAULT now(),
  last_activity_at timestamptz DEFAULT now(),
  expires_at timestamptz,
  is_active boolean DEFAULT true
);

-- Table d'audit des actions utilisateurs
CREATE TABLE IF NOT EXISTS user_audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  action text NOT NULL,
  resource_type text,
  resource_id uuid,
  details jsonb,
  ip_address inet,
  user_agent text,
  created_at timestamptz DEFAULT now()
);

-- Fonction pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers pour updated_at
CREATE TRIGGER update_organizations_updated_at BEFORE UPDATE ON organizations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Fonction pour créer un profil utilisateur automatiquement
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
DECLARE
  default_role_id uuid;
BEGIN
  -- Récupérer l'ID du rôle par défaut
  SELECT id INTO default_role_id FROM user_roles WHERE name = 'viewer' LIMIT 1;
  
  INSERT INTO public.user_profiles (id, email, first_name, last_name, role_id)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'first_name', 'Utilisateur'),
    COALESCE(NEW.raw_user_meta_data->>'last_name', 'Nouveau'),
    default_role_id
  );
  RETURN NEW;
END;
$$ language plpgsql security definer;

-- Trigger pour créer automatiquement un profil
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- RLS Policies
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_audit_log ENABLE ROW LEVEL SECURITY;

-- Politiques pour organizations
CREATE POLICY "Users can view their organization"
  ON organizations FOR SELECT
  TO authenticated
  USING (id IN (SELECT organization_id FROM user_profiles WHERE id = auth.uid()));

CREATE POLICY "Admins can manage organizations"
  ON organizations FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles up
      JOIN user_roles ur ON up.role_id = ur.id
      WHERE up.id = auth.uid() AND ur.level >= 90
    )
  );

-- Politiques pour user_profiles
CREATE POLICY "Users can view their own profile"
  ON user_profiles FOR SELECT
  TO authenticated
  USING (id = auth.uid());

CREATE POLICY "Users can update their own profile"
  ON user_profiles FOR UPDATE
  TO authenticated
  USING (id = auth.uid());

CREATE POLICY "Managers can view team profiles"
  ON user_profiles FOR SELECT
  TO authenticated
  USING (
    organization_id IN (
      SELECT organization_id FROM user_profiles 
      WHERE id = auth.uid()
    ) AND
    EXISTS (
      SELECT 1 FROM user_profiles up
      JOIN user_roles ur ON up.role_id = ur.id
      WHERE up.id = auth.uid() AND ur.level >= 70
    )
  );

-- Politiques pour user_roles
CREATE POLICY "Everyone can view roles"
  ON user_roles FOR SELECT
  TO authenticated
  USING (true);

-- Politiques pour user_sessions
CREATE POLICY "Users can view their own sessions"
  ON user_sessions FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can manage their own sessions"
  ON user_sessions FOR ALL
  TO authenticated
  USING (user_id = auth.uid());

-- Politiques pour user_audit_log
CREATE POLICY "Users can view their own audit log"
  ON user_audit_log FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Admins can view all audit logs"
  ON user_audit_log FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles up
      JOIN user_roles ur ON up.role_id = ur.id
      WHERE up.id = auth.uid() AND ur.level >= 90
    )
  );