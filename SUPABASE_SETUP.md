# Guide de Configuration Supabase pour Dalil.dz

## 1. Création du Projet Supabase

### Étape 1: Créer un compte Supabase
1. Allez sur [supabase.com](https://supabase.com)
2. Cliquez sur "Start your project"
3. Connectez-vous avec GitHub, Google ou créez un compte

### Étape 2: Créer un nouveau projet
1. Cliquez sur "New Project"
2. Choisissez votre organisation
3. Remplissez les informations :
   - **Nom du projet** : `dalil-dz-legal-platform`
   - **Mot de passe de la base de données** : Générez un mot de passe fort
   - **Région** : Choisissez la région la plus proche (Europe West pour l'Algérie)
4. Cliquez sur "Create new project"

## 2. Configuration des Variables d'Environnement

### Récupérer les clés API
1. Dans votre projet Supabase, allez dans **Settings** > **API**
2. Copiez les informations suivantes :
   - **Project URL** : `https://your-project-id.supabase.co`
   - **anon public key** : `eyJ...` (clé publique)
   - **service_role key** : `eyJ...` (clé privée - à garder secrète)

### Créer le fichier .env
```bash
# Créez un fichier .env à la racine du projet
cp .env.example .env
```

Remplissez le fichier `.env` avec vos clés :
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

## 3. Exécution des Migrations

### Option A: Via l'interface Supabase (Recommandé)
1. Allez dans **SQL Editor** dans votre projet Supabase
2. Exécutez les migrations dans l'ordre suivant :

#### Migration 1: Système d'authentification
```sql
-- Copiez et exécutez le contenu de supabase/migrations/20250620000841_bitter_glade.sql
```

#### Migration 2: Système documentaire
```sql
-- Copiez et exécutez le contenu de supabase/migrations/20250620000915_tight_jungle.sql
```

#### Migration 3: Système de collaboration
```sql
-- Copiez et exécutez le contenu de supabase/migrations/20250620001050_fragrant_brook.sql
```

#### Migration 4: Système IA et recherche
```sql
-- Copiez et exécutez le contenu de supabase/migrations/20250620001200_ai_system.sql
```

### Option B: Via Supabase CLI (Avancé)
```bash
# Installer Supabase CLI
npm install -g supabase

# Se connecter à Supabase
supabase login

# Lier le projet local
supabase link --project-ref your-project-id

# Appliquer les migrations
supabase db push
```

## 4. Configuration de l'Authentification

### Paramètres d'authentification
1. Allez dans **Authentication** > **Settings**
2. Configurez les paramètres suivants :

#### Site URL
```
http://localhost:5173
```

#### Redirect URLs
```
http://localhost:5173
http://localhost:5173/auth/callback
https://your-production-domain.com
https://your-production-domain.com/auth/callback
```

#### Email Templates (Optionnel)
Personnalisez les templates d'email dans **Authentication** > **Email Templates**

## 5. Configuration du Stockage (Storage)

### Créer les buckets de stockage
1. Allez dans **Storage**
2. Créez les buckets suivants :
   - `documents` (pour les fichiers PDF, DOC, etc.)
   - `avatars` (pour les photos de profil)
   - `attachments` (pour les pièces jointes)

### Politiques de sécurité pour le stockage
```sql
-- Politique pour les documents
CREATE POLICY "Users can upload documents" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'documents' AND auth.role() = 'authenticated');

CREATE POLICY "Users can view documents" ON storage.objects
FOR SELECT USING (bucket_id = 'documents' AND auth.role() = 'authenticated');

-- Politique pour les avatars
CREATE POLICY "Users can upload avatars" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'avatars' AND auth.role() = 'authenticated');

CREATE POLICY "Anyone can view avatars" ON storage.objects
FOR SELECT USING (bucket_id = 'avatars');
```

## 6. Configuration des Edge Functions

### Déployer les fonctions
Les fonctions Edge sont déjà configurées dans le projet :
- `ai-assistant` : Assistant IA juridique
- `collaboration-sync` : Synchronisation collaborative
- `document-search` : Recherche avancée

Pour les déployer :
```bash
# Via Supabase CLI
supabase functions deploy ai-assistant
supabase functions deploy collaboration-sync
supabase functions deploy document-search
```

## 7. Configuration de la Sécurité

### Row Level Security (RLS)
Toutes les tables ont RLS activé avec des politiques appropriées. Vérifiez que :
1. Les utilisateurs ne peuvent voir que leurs propres données
2. Les permissions sont correctement configurées
3. Les données publiques sont accessibles

### Variables d'environnement pour les fonctions
Dans **Settings** > **Edge Functions**, ajoutez :
```
OPENAI_API_KEY=your_openai_key (si vous utilisez OpenAI)
ANTHROPIC_API_KEY=your_anthropic_key (si vous utilisez Claude)
```

## 8. Test de la Configuration

### Vérifier la connexion
```bash
# Démarrer le serveur de développement
npm run dev

# Tester la connexion dans la console du navigateur
console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL)
```

### Tester l'authentification
1. Essayez de créer un compte
2. Vérifiez que le profil utilisateur est créé automatiquement
3. Testez la connexion/déconnexion

### Tester les fonctionnalités
1. **Documents** : Upload et visualisation
2. **Recherche** : Recherche textuelle
3. **Assistant IA** : Poser une question
4. **Collaboration** : Créer un espace de travail

## 9. Monitoring et Analytics

### Configurer les alertes
1. Allez dans **Settings** > **Billing**
2. Configurez des alertes pour l'usage
3. Surveillez les métriques dans **Reports**

### Logs et debugging
- **Logs** : Consultez les logs des fonctions Edge
- **SQL Editor** : Utilisez pour déboguer les requêtes
- **API Logs** : Surveillez les appels API

## 10. Déploiement en Production

### Variables d'environnement de production
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your_production_anon_key
```

### Sécurité en production
1. Changez les URLs de redirection
2. Configurez les CORS appropriés
3. Activez les alertes de sécurité
4. Configurez les sauvegardes automatiques

## Dépannage

### Problèmes courants

#### Erreur de connexion
- Vérifiez les variables d'environnement
- Assurez-vous que l'URL et les clés sont correctes

#### Erreurs RLS
- Vérifiez que l'utilisateur est authentifié
- Contrôlez les politiques de sécurité

#### Fonctions Edge qui ne fonctionnent pas
- Vérifiez les logs dans Supabase
- Assurez-vous que les variables d'environnement sont configurées

### Support
- [Documentation Supabase](https://supabase.com/docs)
- [Discord Supabase](https://discord.supabase.com)
- [GitHub Issues](https://github.com/supabase/supabase/issues)

## Prochaines Étapes

1. **Personnalisation** : Adaptez les schémas selon vos besoins spécifiques
2. **Optimisation** : Ajoutez des index pour améliorer les performances
3. **Monitoring** : Configurez des alertes et métriques personnalisées
4. **Sauvegardes** : Planifiez des sauvegardes régulières
5. **Scaling** : Préparez la montée en charge

Votre plateforme juridique Dalil.dz est maintenant prête avec Supabase ! 🚀