/*
  # Système de gestion documentaire avancé

  1. Tables principales
    - `document_categories` - Catégories de documents
    - `documents` - Documents principaux
    - `document_versions` - Versioning des documents
    - `document_metadata` - Métadonnées étendues
    - `document_tags` - Système de tags
    - `document_permissions` - Permissions granulaires
    - `document_annotations` - Annotations et commentaires
    - `document_favorites` - Documents favoris
    - `document_downloads` - Historique des téléchargements

  2. Fonctionnalités
    - Versioning complet des documents
    - Système de tags flexible
    - Permissions granulaires
    - Annotations collaboratives
    - Recherche full-text
    - Audit trail complet
*/

-- Extension pour la recherche full-text
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Table des catégories de documents
CREATE TABLE IF NOT EXISTS document_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  parent_id uuid REFERENCES document_categories(id),
  color text DEFAULT '#3B82F6',
  icon text DEFAULT 'FileText',
  sort_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Insérer les catégories par défaut
INSERT INTO document_categories (name, description, color, icon) VALUES
('Droit du Travail', 'Législation et réglementation du travail', '#10B981', 'Users'),
('Droit Fiscal', 'Fiscalité et finances publiques', '#F59E0B', 'Calculator'),
('Droit Commercial', 'Droit des affaires et commerce', '#8B5CF6', 'Building'),
('Procédures Administratives', 'Procédures et formalités administratives', '#EF4444', 'FileText'),
('Droit Civil', 'Code civil et droit des personnes', '#6366F1', 'Scale'),
('Droit Pénal', 'Code pénal et procédure pénale', '#DC2626', 'Shield')
ON CONFLICT DO NOTHING;

-- Table des tags
CREATE TABLE IF NOT EXISTS document_tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  color text DEFAULT '#6B7280',
  usage_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Table principale des documents
CREATE TABLE IF NOT EXISTS documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  content text,
  file_url text,
  file_name text,
  file_size bigint,
  file_type text,
  mime_type text,
  category_id uuid REFERENCES document_categories(id),
  document_type text NOT NULL CHECK (document_type IN ('loi', 'decret', 'arrete', 'circulaire', 'ordonnance', 'guide', 'formulaire', 'autre')),
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'review', 'published', 'archived')),
  publication_date date,
  effective_date date,
  expiry_date date,
  reference_number text,
  source_url text,
  language text DEFAULT 'fr',
  created_by uuid REFERENCES auth.users(id),
  updated_by uuid REFERENCES auth.users(id),
  organization_id uuid REFERENCES organizations(id),
  view_count integer DEFAULT 0,
  download_count integer DEFAULT 0,
  is_featured boolean DEFAULT false,
  is_public boolean DEFAULT false,
  search_vector tsvector,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Table des versions de documents
CREATE TABLE IF NOT EXISTS document_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id uuid REFERENCES documents(id) ON DELETE CASCADE,
  version_number text NOT NULL,
  title text NOT NULL,
  content text,
  file_url text,
  file_name text,
  file_size bigint,
  changes_summary text,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now()
);

-- Table des métadonnées étendues
CREATE TABLE IF NOT EXISTS document_metadata (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id uuid REFERENCES documents(id) ON DELETE CASCADE,
  key text NOT NULL,
  value text,
  value_type text DEFAULT 'text' CHECK (value_type IN ('text', 'number', 'date', 'boolean', 'json')),
  is_searchable boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Table de liaison documents-tags
CREATE TABLE IF NOT EXISTS document_tag_relations (
  document_id uuid REFERENCES documents(id) ON DELETE CASCADE,
  tag_id uuid REFERENCES document_tags(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (document_id, tag_id)
);

-- Table des permissions de documents
CREATE TABLE IF NOT EXISTS document_permissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id uuid REFERENCES documents(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id),
  role_id uuid REFERENCES user_roles(id),
  organization_id uuid REFERENCES organizations(id),
  permission_type text NOT NULL CHECK (permission_type IN ('view', 'edit', 'delete', 'share', 'admin')),
  granted_by uuid REFERENCES auth.users(id),
  expires_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Table des annotations
CREATE TABLE IF NOT EXISTS document_annotations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id uuid REFERENCES documents(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id),
  content text NOT NULL,
  annotation_type text DEFAULT 'note' CHECK (annotation_type IN ('note', 'highlight', 'comment', 'question')),
  position_data jsonb,
  is_private boolean DEFAULT false,
  parent_id uuid REFERENCES document_annotations(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Table des favoris
CREATE TABLE IF NOT EXISTS document_favorites (
  user_id uuid REFERENCES auth.users(id),
  document_id uuid REFERENCES documents(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (user_id, document_id)
);

-- Table des téléchargements
CREATE TABLE IF NOT EXISTS document_downloads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id uuid REFERENCES documents(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id),
  ip_address inet,
  user_agent text,
  download_type text DEFAULT 'file' CHECK (download_type IN ('file', 'pdf', 'export')),
  created_at timestamptz DEFAULT now()
);

-- Table des collections de documents
CREATE TABLE IF NOT EXISTS document_collections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  created_by uuid REFERENCES auth.users(id),
  organization_id uuid REFERENCES organizations(id),
  is_public boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Table de liaison collections-documents
CREATE TABLE IF NOT EXISTS document_collection_items (
  collection_id uuid REFERENCES document_collections(id) ON DELETE CASCADE,
  document_id uuid REFERENCES documents(id) ON DELETE CASCADE,
  sort_order integer DEFAULT 0,
  added_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (collection_id, document_id)
);

-- Index pour la recherche full-text
CREATE INDEX IF NOT EXISTS documents_search_idx ON documents USING GIN(search_vector);
CREATE INDEX IF NOT EXISTS documents_title_idx ON documents USING GIN(title gin_trgm_ops);
CREATE INDEX IF NOT EXISTS documents_content_idx ON documents USING GIN(content gin_trgm_ops);

-- Index pour les performances
CREATE INDEX IF NOT EXISTS documents_category_idx ON documents(category_id);
CREATE INDEX IF NOT EXISTS documents_created_by_idx ON documents(created_by);
CREATE INDEX IF NOT EXISTS documents_organization_idx ON documents(organization_id);
CREATE INDEX IF NOT EXISTS documents_status_idx ON documents(status);
CREATE INDEX IF NOT EXISTS documents_type_idx ON documents(document_type);

-- Fonction pour mettre à jour le vecteur de recherche
CREATE OR REPLACE FUNCTION update_document_search_vector()
RETURNS trigger AS $$
BEGIN
  NEW.search_vector := to_tsvector('french', 
    COALESCE(NEW.title, '') || ' ' || 
    COALESCE(NEW.description, '') || ' ' || 
    COALESCE(NEW.content, '') || ' ' ||
    COALESCE(NEW.reference_number, '')
  );
  RETURN NEW;
END;
$$ language plpgsql;

-- Trigger pour la recherche
CREATE TRIGGER update_documents_search_vector
  BEFORE INSERT OR UPDATE ON documents
  FOR EACH ROW EXECUTE FUNCTION update_document_search_vector();

-- Fonction pour incrémenter le compteur de vues
CREATE OR REPLACE FUNCTION increment_document_view_count(doc_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE documents 
  SET view_count = view_count + 1 
  WHERE id = doc_id;
END;
$$ language plpgsql security definer;

-- Fonction pour incrémenter le compteur de téléchargements
CREATE OR REPLACE FUNCTION increment_document_download_count(doc_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE documents 
  SET download_count = download_count + 1 
  WHERE id = doc_id;
END;
$$ language plpgsql security definer;

-- Triggers pour updated_at
CREATE TRIGGER update_documents_updated_at BEFORE UPDATE ON documents FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_document_categories_updated_at BEFORE UPDATE ON document_categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_document_annotations_updated_at BEFORE UPDATE ON document_annotations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_document_collections_updated_at BEFORE UPDATE ON document_collections FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- RLS Policies
ALTER TABLE document_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_metadata ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_tag_relations ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_annotations ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_downloads ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_collection_items ENABLE ROW LEVEL SECURITY;

-- Politiques pour document_categories
CREATE POLICY "Everyone can view categories"
  ON document_categories FOR SELECT
  TO authenticated
  USING (true);

-- Politiques pour documents
CREATE POLICY "Users can view public documents"
  ON documents FOR SELECT
  TO authenticated
  USING (is_public = true OR created_by = auth.uid() OR organization_id IN (
    SELECT organization_id FROM user_profiles WHERE id = auth.uid()
  ));

CREATE POLICY "Users can create documents"
  ON documents FOR INSERT
  TO authenticated
  WITH CHECK (created_by = auth.uid());

CREATE POLICY "Users can update their documents"
  ON documents FOR UPDATE
  TO authenticated
  USING (created_by = auth.uid() OR EXISTS (
    SELECT 1 FROM document_permissions dp
    WHERE dp.document_id = id AND dp.user_id = auth.uid() AND dp.permission_type IN ('edit', 'admin')
  ));

-- Politiques pour document_annotations
CREATE POLICY "Users can view annotations"
  ON document_annotations FOR SELECT
  TO authenticated
  USING (is_private = false OR user_id = auth.uid());

CREATE POLICY "Users can create annotations"
  ON document_annotations FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their annotations"
  ON document_annotations FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

-- Politiques pour document_favorites
CREATE POLICY "Users can manage their favorites"
  ON document_favorites FOR ALL
  TO authenticated
  USING (user_id = auth.uid());