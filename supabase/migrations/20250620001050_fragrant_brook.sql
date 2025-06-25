/*
  # Système de collaboration en temps réel

  1. Tables principales
    - `workspaces` - Espaces de travail collaboratifs
    - `workspace_members` - Membres des espaces de travail
    - `collaborative_documents` - Documents collaboratifs
    - `document_collaborators` - Collaborateurs sur documents
    - `real_time_edits` - Éditions en temps réel
    - `comments` - Système de commentaires
    - `notifications` - Notifications utilisateur
    - `activity_feed` - Flux d'activité

  2. Fonctionnalités
    - Espaces de travail partagés
    - Édition collaborative en temps réel
    - Système de commentaires
    - Notifications push
    - Historique d'activité
    - Permissions granulaires
*/

-- Table des espaces de travail
CREATE TABLE IF NOT EXISTS workspaces (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  type text DEFAULT 'private' CHECK (type IN ('private', 'public', 'organization')),
  settings jsonb DEFAULT '{
    "allow_public_join": false,
    "require_approval": true,
    "default_permissions": ["view", "comment"]
  }',
  created_by uuid REFERENCES auth.users(id),
  organization_id uuid REFERENCES organizations(id),
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Table des membres d'espaces de travail
CREATE TABLE IF NOT EXISTS workspace_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid REFERENCES workspaces(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id),
  role text DEFAULT 'member' CHECK (role IN ('owner', 'admin', 'editor', 'member', 'viewer')),
  permissions text[] DEFAULT '{"view", "comment"}',
  joined_at timestamptz DEFAULT now(),
  invited_by uuid REFERENCES auth.users(id),
  is_active boolean DEFAULT true,
  UNIQUE(workspace_id, user_id)
);

-- Table des documents collaboratifs
CREATE TABLE IF NOT EXISTS collaborative_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid REFERENCES workspaces(id),
  document_id uuid REFERENCES documents(id),
  title text NOT NULL,
  content jsonb DEFAULT '{}', -- Structure pour éditeur collaboratif
  version integer DEFAULT 1,
  is_locked boolean DEFAULT false,
  locked_by uuid REFERENCES auth.users(id),
  locked_at timestamptz,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Table des collaborateurs sur documents
CREATE TABLE IF NOT EXISTS document_collaborators (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id uuid REFERENCES collaborative_documents(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id),
  permissions text[] DEFAULT '{"view", "edit", "comment"}',
  last_seen_at timestamptz DEFAULT now(),
  cursor_position jsonb,
  is_online boolean DEFAULT false,
  added_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now()
);

-- Table des éditions en temps réel
CREATE TABLE IF NOT EXISTS real_time_edits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id uuid REFERENCES collaborative_documents(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id),
  operation_type text NOT NULL CHECK (operation_type IN ('insert', 'delete', 'format', 'move')),
  operation_data jsonb NOT NULL,
  position_start integer,
  position_end integer,
  version_before integer,
  version_after integer,
  created_at timestamptz DEFAULT now()
);

-- Table des commentaires
CREATE TABLE IF NOT EXISTS comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  target_type text NOT NULL CHECK (target_type IN ('document', 'workspace', 'annotation')),
  target_id uuid NOT NULL,
  parent_id uuid REFERENCES comments(id),
  user_id uuid REFERENCES auth.users(id),
  content text NOT NULL,
  position_data jsonb, -- Pour les commentaires positionnés
  status text DEFAULT 'active' CHECK (status IN ('active', 'resolved', 'deleted')),
  resolved_by uuid REFERENCES auth.users(id),
  resolved_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Table des notifications
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  type text NOT NULL CHECK (type IN ('comment', 'mention', 'document_shared', 'workspace_invite', 'document_updated', 'system')),
  title text NOT NULL,
  message text NOT NULL,
  data jsonb DEFAULT '{}',
  is_read boolean DEFAULT false,
  is_sent boolean DEFAULT false,
  channels text[] DEFAULT '{"in_app"}', -- in_app, email, push, sms
  priority text DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  expires_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Table du flux d'activité
CREATE TABLE IF NOT EXISTS activity_feed (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  workspace_id uuid REFERENCES workspaces(id),
  action_type text NOT NULL,
  target_type text NOT NULL,
  target_id uuid NOT NULL,
  description text NOT NULL,
  metadata jsonb DEFAULT '{}',
  is_public boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Table des invitations
CREATE TABLE IF NOT EXISTS workspace_invitations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid REFERENCES workspaces(id) ON DELETE CASCADE,
  email text NOT NULL,
  invited_by uuid REFERENCES auth.users(id),
  role text DEFAULT 'member',
  permissions text[] DEFAULT '{"view", "comment"}',
  token text NOT NULL UNIQUE,
  expires_at timestamptz NOT NULL,
  accepted_at timestamptz,
  accepted_by uuid REFERENCES auth.users(id),
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined', 'expired')),
  created_at timestamptz DEFAULT now()
);

-- Table des sessions de collaboration en temps réel
CREATE TABLE IF NOT EXISTS collaboration_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id uuid REFERENCES collaborative_documents(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id),
  session_token text NOT NULL,
  cursor_position jsonb,
  selection_range jsonb,
  is_active boolean DEFAULT true,
  last_activity_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Index pour les performances
CREATE INDEX IF NOT EXISTS workspaces_created_by_idx ON workspaces(created_by);
CREATE INDEX IF NOT EXISTS workspaces_organization_idx ON workspaces(organization_id);
CREATE INDEX IF NOT EXISTS workspace_members_workspace_idx ON workspace_members(workspace_id);
CREATE INDEX IF NOT EXISTS workspace_members_user_idx ON workspace_members(user_id);
CREATE INDEX IF NOT EXISTS collaborative_documents_workspace_idx ON collaborative_documents(workspace_id);
CREATE INDEX IF NOT EXISTS document_collaborators_document_idx ON document_collaborators(document_id);
CREATE INDEX IF NOT EXISTS document_collaborators_user_idx ON document_collaborators(user_id);
CREATE INDEX IF NOT EXISTS real_time_edits_document_idx ON real_time_edits(document_id);
CREATE INDEX IF NOT EXISTS real_time_edits_created_at_idx ON real_time_edits(created_at);
CREATE INDEX IF NOT EXISTS comments_target_idx ON comments(target_type, target_id);
CREATE INDEX IF NOT EXISTS comments_user_idx ON comments(user_id);
CREATE INDEX IF NOT EXISTS notifications_user_idx ON notifications(user_id);
CREATE INDEX IF NOT EXISTS notifications_is_read_idx ON notifications(is_read);
CREATE INDEX IF NOT EXISTS activity_feed_workspace_idx ON activity_feed(workspace_id);
CREATE INDEX IF NOT EXISTS activity_feed_created_at_idx ON activity_feed(created_at);

-- Fonction pour créer une notification
CREATE OR REPLACE FUNCTION create_notification(
  p_user_id uuid,
  p_type text,
  p_title text,
  p_message text,
  p_data jsonb DEFAULT '{}',
  p_channels text[] DEFAULT '{"in_app"}',
  p_priority text DEFAULT 'normal'
)
RETURNS uuid AS $$
DECLARE
  notification_id uuid;
BEGIN
  INSERT INTO notifications (user_id, type, title, message, data, channels, priority)
  VALUES (p_user_id, p_type, p_title, p_message, p_data, p_channels, p_priority)
  RETURNING id INTO notification_id;
  
  RETURN notification_id;
END;
$$ language plpgsql security definer;

-- Fonction pour enregistrer une activité
CREATE OR REPLACE FUNCTION log_activity(
  p_user_id uuid,
  p_workspace_id uuid,
  p_action_type text,
  p_target_type text,
  p_target_id uuid,
  p_description text,
  p_metadata jsonb DEFAULT '{}',
  p_is_public boolean DEFAULT true
)
RETURNS uuid AS $$
DECLARE
  activity_id uuid;
BEGIN
  INSERT INTO activity_feed (user_id, workspace_id, action_type, target_type, target_id, description, metadata, is_public)
  VALUES (p_user_id, p_workspace_id, p_action_type, p_target_type, p_target_id, p_description, p_metadata, p_is_public)
  RETURNING id INTO activity_id;
  
  RETURN activity_id;
END;
$$ language plpgsql security definer;

-- Fonction pour vérifier les permissions d'espace de travail
CREATE OR REPLACE FUNCTION check_workspace_permission(
  p_workspace_id uuid,
  p_user_id uuid,
  p_permission text
)
RETURNS boolean AS $$
DECLARE
  has_permission boolean := false;
BEGIN
  SELECT EXISTS (
    SELECT 1 FROM workspace_members wm
    WHERE wm.workspace_id = p_workspace_id 
      AND wm.user_id = p_user_id 
      AND wm.is_active = true
      AND (p_permission = ANY(wm.permissions) OR wm.role IN ('owner', 'admin'))
  ) INTO has_permission;
  
  RETURN has_permission;
END;
$$ language plpgsql security definer;

-- Fonction pour nettoyer les sessions inactives
CREATE OR REPLACE FUNCTION cleanup_inactive_sessions()
RETURNS void AS $$
BEGIN
  UPDATE collaboration_sessions 
  SET is_active = false 
  WHERE last_activity_at < now() - interval '30 minutes'
    AND is_active = true;
    
  DELETE FROM collaboration_sessions 
  WHERE created_at < now() - interval '24 hours'
    AND is_active = false;
END;
$$ language plpgsql security definer;

-- Triggers pour updated_at
CREATE TRIGGER update_workspaces_updated_at BEFORE UPDATE ON workspaces FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_collaborative_documents_updated_at BEFORE UPDATE ON collaborative_documents FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_comments_updated_at BEFORE UPDATE ON comments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger pour enregistrer l'activité lors de la création de commentaires
CREATE OR REPLACE FUNCTION log_comment_activity()
RETURNS trigger AS $$
BEGIN
  PERFORM log_activity(
    NEW.user_id,
    CASE 
      WHEN NEW.target_type = 'document' THEN (
        SELECT workspace_id FROM collaborative_documents WHERE id = NEW.target_id
      )
      ELSE NULL
    END,
    'comment_created',
    NEW.target_type,
    NEW.target_id,
    'A ajouté un commentaire',
    jsonb_build_object('comment_id', NEW.id, 'content_preview', left(NEW.content, 100))
  );
  
  RETURN NEW;
END;
$$ language plpgsql security definer;

CREATE TRIGGER log_comment_activity_trigger
  AFTER INSERT ON comments
  FOR EACH ROW EXECUTE FUNCTION log_comment_activity();

-- RLS Policies
ALTER TABLE workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE workspace_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE collaborative_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_collaborators ENABLE ROW LEVEL SECURITY;
ALTER TABLE real_time_edits ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_feed ENABLE ROW LEVEL SECURITY;
ALTER TABLE workspace_invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE collaboration_sessions ENABLE ROW LEVEL SECURITY;

-- Politiques pour workspaces
CREATE POLICY "Users can view workspaces they're members of"
  ON workspaces FOR SELECT
  TO authenticated
  USING (
    id IN (
      SELECT workspace_id FROM workspace_members 
      WHERE user_id = auth.uid() AND is_active = true
    ) OR type = 'public'
  );

CREATE POLICY "Users can create workspaces"
  ON workspaces FOR INSERT
  TO authenticated
  WITH CHECK (created_by = auth.uid());

CREATE POLICY "Workspace owners can update their workspaces"
  ON workspaces FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM workspace_members 
      WHERE workspace_id = id AND user_id = auth.uid() AND role IN ('owner', 'admin')
    )
  );

-- Politiques pour workspace_members
CREATE POLICY "Users can view workspace members"
  ON workspace_members FOR SELECT
  TO authenticated
  USING (
    workspace_id IN (
      SELECT workspace_id FROM workspace_members 
      WHERE user_id = auth.uid() AND is_active = true
    )
  );

CREATE POLICY "Workspace admins can manage members"
  ON workspace_members FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM workspace_members 
      WHERE workspace_id = workspace_members.workspace_id 
        AND user_id = auth.uid() 
        AND role IN ('owner', 'admin')
    )
  );

-- Politiques pour collaborative_documents
CREATE POLICY "Users can view documents in their workspaces"
  ON collaborative_documents FOR SELECT
  TO authenticated
  USING (
    workspace_id IN (
      SELECT workspace_id FROM workspace_members 
      WHERE user_id = auth.uid() AND is_active = true
    )
  );

CREATE POLICY "Users can create documents in their workspaces"
  ON collaborative_documents FOR INSERT
  TO authenticated
  WITH CHECK (
    workspace_id IN (
      SELECT workspace_id FROM workspace_members 
      WHERE user_id = auth.uid() AND is_active = true
        AND ('edit' = ANY(permissions) OR role IN ('owner', 'admin', 'editor'))
    )
  );

-- Politiques pour comments
CREATE POLICY "Users can view comments on accessible content"
  ON comments FOR SELECT
  TO authenticated
  USING (
    CASE target_type
      WHEN 'document' THEN target_id IN (
        SELECT id FROM collaborative_documents cd
        WHERE cd.workspace_id IN (
          SELECT workspace_id FROM workspace_members 
          WHERE user_id = auth.uid() AND is_active = true
        )
      )
      ELSE true
    END
  );

CREATE POLICY "Users can create comments"
  ON comments FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their comments"
  ON comments FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

-- Politiques pour notifications
CREATE POLICY "Users can view their notifications"
  ON notifications FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can update their notifications"
  ON notifications FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

-- Politiques pour activity_feed
CREATE POLICY "Users can view activity in their workspaces"
  ON activity_feed FOR SELECT
  TO authenticated
  USING (
    workspace_id IN (
      SELECT workspace_id FROM workspace_members 
      WHERE user_id = auth.uid() AND is_active = true
    ) AND is_public = true
  );