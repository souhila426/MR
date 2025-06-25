/*
  # Système d'Intelligence Artificielle et Recherche

  1. Tables principales
    - `ai_conversations` - Conversations avec l'IA
    - `ai_messages` - Messages dans les conversations
    - `ai_knowledge_base` - Base de connaissances pour l'IA
    - `ai_feedback` - Feedback sur les réponses IA
    - `search_queries` - Historique des recherches
    - `search_results` - Résultats de recherche
    - `search_analytics` - Analytics des recherches

  2. Fonctionnalités
    - Conversations IA persistantes
    - Base de connaissances juridique
    - Système de feedback
    - Analytics de recherche
    - Suggestions intelligentes
*/

-- Table des conversations IA
CREATE TABLE IF NOT EXISTS ai_conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  title text,
  context_type text DEFAULT 'general' CHECK (context_type IN ('general', 'document', 'search', 'procedure')),
  context_data jsonb DEFAULT '{}',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Table des messages IA
CREATE TABLE IF NOT EXISTS ai_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid REFERENCES ai_conversations(id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content text NOT NULL,
  metadata jsonb DEFAULT '{}',
  sources jsonb DEFAULT '[]',
  confidence_score decimal(3,2),
  processing_time_ms integer,
  tokens_used integer,
  feedback_score integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Table de la base de connaissances IA
CREATE TABLE IF NOT EXISTS ai_knowledge_base (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  category text NOT NULL,
  subcategory text,
  tags text[] DEFAULT '{}',
  source_type text CHECK (source_type IN ('document', 'manual', 'faq', 'procedure')),
  source_id uuid,
  confidence_level decimal(3,2) DEFAULT 0.8,
  last_updated timestamptz DEFAULT now(),
  is_active boolean DEFAULT true,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now()
);

-- Table des feedbacks IA
CREATE TABLE IF NOT EXISTS ai_feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id uuid REFERENCES ai_messages(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id),
  feedback_type text NOT NULL CHECK (feedback_type IN ('helpful', 'not_helpful', 'incorrect', 'incomplete', 'excellent')),
  rating integer CHECK (rating >= 1 AND rating <= 5),
  comment text,
  created_at timestamptz DEFAULT now()
);

-- Table des requêtes de recherche
CREATE TABLE IF NOT EXISTS search_queries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  query_text text NOT NULL,
  query_type text DEFAULT 'text' CHECK (query_type IN ('text', 'semantic', 'ai_assisted')),
  filters jsonb DEFAULT '{}',
  results_count integer DEFAULT 0,
  execution_time_ms integer,
  created_at timestamptz DEFAULT now()
);

-- Table des résultats de recherche
CREATE TABLE IF NOT EXISTS search_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  query_id uuid REFERENCES search_queries(id) ON DELETE CASCADE,
  document_id uuid REFERENCES documents(id),
  relevance_score decimal(5,2),
  ranking_position integer,
  match_type text DEFAULT 'text' CHECK (match_type IN ('text', 'semantic', 'ai')),
  clicked boolean DEFAULT false,
  clicked_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Table des analytics de recherche
CREATE TABLE IF NOT EXISTS search_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date date NOT NULL,
  total_searches integer DEFAULT 0,
  unique_users integer DEFAULT 0,
  avg_results_per_search decimal(5,2),
  avg_execution_time_ms decimal(8,2),
  top_queries jsonb DEFAULT '[]',
  popular_filters jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  UNIQUE(date)
);

-- Index pour la recherche dans la base de connaissances
CREATE INDEX IF NOT EXISTS ai_knowledge_base_content_idx ON ai_knowledge_base USING GIN(to_tsvector('french', content));
CREATE INDEX IF NOT EXISTS ai_knowledge_base_category_idx ON ai_knowledge_base(category);
CREATE INDEX IF NOT EXISTS ai_knowledge_base_tags_idx ON ai_knowledge_base USING GIN(tags);

-- Index pour les performances
CREATE INDEX IF NOT EXISTS ai_conversations_user_idx ON ai_conversations(user_id);
CREATE INDEX IF NOT EXISTS ai_messages_conversation_idx ON ai_messages(conversation_id);
CREATE INDEX IF NOT EXISTS ai_messages_created_at_idx ON ai_messages(created_at);
CREATE INDEX IF NOT EXISTS search_queries_user_idx ON search_queries(user_id);
CREATE INDEX IF NOT EXISTS search_queries_created_at_idx ON search_queries(created_at);
CREATE INDEX IF NOT EXISTS search_results_query_idx ON search_results(query_id);

-- Fonction pour la recherche sémantique (simulation)
CREATE OR REPLACE FUNCTION semantic_search(p_query text, p_limit integer DEFAULT 10)
RETURNS TABLE(
  id uuid,
  title text,
  content text,
  category text,
  relevance_score decimal
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    kb.id,
    kb.title,
    kb.content,
    kb.category,
    (ts_rank(to_tsvector('french', kb.content), plainto_tsquery('french', p_query)) * 100)::decimal(5,2) as relevance_score
  FROM ai_knowledge_base kb
  WHERE kb.is_active = true
    AND to_tsvector('french', kb.content) @@ plainto_tsquery('french', p_query)
  ORDER BY relevance_score DESC
  LIMIT p_limit;
END;
$$ language plpgsql security definer;

-- Fonction pour obtenir des suggestions de recherche
CREATE OR REPLACE FUNCTION get_search_suggestions(p_query text, p_limit integer DEFAULT 5)
RETURNS TABLE(suggestion text, frequency integer) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    sq.query_text as suggestion,
    COUNT(*)::integer as frequency
  FROM search_queries sq
  WHERE sq.query_text ILIKE '%' || p_query || '%'
    AND sq.created_at > now() - interval '30 days'
  GROUP BY sq.query_text
  ORDER BY frequency DESC, sq.query_text
  LIMIT p_limit;
END;
$$ language plpgsql security definer;

-- Fonction pour mettre à jour les analytics de recherche
CREATE OR REPLACE FUNCTION update_search_analytics()
RETURNS void AS $$
DECLARE
  today_date date := CURRENT_DATE;
  total_searches_count integer;
  unique_users_count integer;
  avg_results decimal(5,2);
  avg_time decimal(8,2);
  top_queries_data jsonb;
BEGIN
  -- Calculer les métriques du jour
  SELECT 
    COUNT(*),
    COUNT(DISTINCT user_id),
    AVG(results_count),
    AVG(execution_time_ms)
  INTO total_searches_count, unique_users_count, avg_results, avg_time
  FROM search_queries
  WHERE DATE(created_at) = today_date;

  -- Obtenir les requêtes les plus populaires
  SELECT jsonb_agg(
    jsonb_build_object(
      'query', query_text,
      'count', query_count
    )
  )
  INTO top_queries_data
  FROM (
    SELECT query_text, COUNT(*) as query_count
    FROM search_queries
    WHERE DATE(created_at) = today_date
    GROUP BY query_text
    ORDER BY query_count DESC
    LIMIT 10
  ) top_queries;

  -- Insérer ou mettre à jour les analytics
  INSERT INTO search_analytics (
    date, 
    total_searches, 
    unique_users, 
    avg_results_per_search, 
    avg_execution_time_ms,
    top_queries
  )
  VALUES (
    today_date,
    total_searches_count,
    unique_users_count,
    avg_results,
    avg_time,
    COALESCE(top_queries_data, '[]'::jsonb)
  )
  ON CONFLICT (date) DO UPDATE SET
    total_searches = EXCLUDED.total_searches,
    unique_users = EXCLUDED.unique_users,
    avg_results_per_search = EXCLUDED.avg_results_per_search,
    avg_execution_time_ms = EXCLUDED.avg_execution_time_ms,
    top_queries = EXCLUDED.top_queries;
END;
$$ language plpgsql security definer;

-- Insérer des données de base de connaissances
INSERT INTO ai_knowledge_base (title, content, category, subcategory, tags, source_type) VALUES
(
  'Code du travail - Durée légale du travail',
  'La durée légale du travail est fixée à quarante (40) heures par semaine. Cette durée peut être répartie sur cinq (5) ou six (6) jours selon les nécessités du service. La durée quotidienne du travail ne peut excéder douze (12) heures.',
  'Droit du Travail',
  'Durée du travail',
  ARRAY['durée', 'travail', 'heures', 'semaine'],
  'manual'
),
(
  'Procédure de création d''entreprise',
  'Pour créer une entreprise en Algérie, il faut : 1) Réserver la dénomination sociale au CNRC, 2) Déposer le capital social, 3) Rédiger les statuts, 4) S''immatriculer au registre de commerce, 5) Publier au BOAL, 6) Obtenir l''immatriculation fiscale.',
  'Procédures Administratives',
  'Création d''entreprise',
  ARRAY['entreprise', 'création', 'CNRC', 'immatriculation'],
  'manual'
),
(
  'Calcul de l''impôt sur les bénéfices des sociétés',
  'L''impôt sur les bénéfices des sociétés (IBS) est calculé au taux de 25% sur le bénéfice imposable. Des taux réduits peuvent s''appliquer pour certaines activités ou zones géographiques.',
  'Droit Fiscal',
  'Impôt sur les sociétés',
  ARRAY['IBS', 'impôt', 'sociétés', 'bénéfices', '25%'],
  'manual'
)
ON CONFLICT DO NOTHING;

-- Triggers pour updated_at
CREATE TRIGGER update_ai_conversations_updated_at BEFORE UPDATE ON ai_conversations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- RLS Policies
ALTER TABLE ai_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_knowledge_base ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE search_queries ENABLE ROW LEVEL SECURITY;
ALTER TABLE search_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE search_analytics ENABLE ROW LEVEL SECURITY;

-- Politiques pour ai_conversations
CREATE POLICY "Users can view their conversations"
  ON ai_conversations FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create conversations"
  ON ai_conversations FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their conversations"
  ON ai_conversations FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

-- Politiques pour ai_messages
CREATE POLICY "Users can view messages in their conversations"
  ON ai_messages FOR SELECT
  TO authenticated
  USING (
    conversation_id IN (
      SELECT id FROM ai_conversations WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create messages in their conversations"
  ON ai_messages FOR INSERT
  TO authenticated
  WITH CHECK (
    conversation_id IN (
      SELECT id FROM ai_conversations WHERE user_id = auth.uid()
    )
  );

-- Politiques pour ai_knowledge_base
CREATE POLICY "Everyone can view active knowledge base"
  ON ai_knowledge_base FOR SELECT
  TO authenticated
  USING (is_active = true);

-- Politiques pour search_queries
CREATE POLICY "Users can view their search queries"
  ON search_queries FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create search queries"
  ON search_queries FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Politiques pour ai_feedback
CREATE POLICY "Users can create feedback"
  ON ai_feedback FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can view their feedback"
  ON ai_feedback FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());