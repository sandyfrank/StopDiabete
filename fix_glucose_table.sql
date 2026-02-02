-- Script de correction de la table glucose_readings
-- Date : 2 février 2026

-- 1. Vérifier la structure actuelle
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'glucose_readings'
ORDER BY ordinal_position;

-- 2. Si la table existe avec une mauvaise structure, la supprimer et recréer
DROP TABLE IF EXISTS glucose_readings CASCADE;

-- 3. Créer la table avec la bonne structure
CREATE TABLE glucose_readings (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    value NUMERIC(5,2) NOT NULL CHECK (value >= 20 AND value <= 600),
    measurement_type VARCHAR(20) NOT NULL CHECK (measurement_type IN ('fasting', 'after_meal', 'before_meal', 'before_sleep', 'random')),
    measured_at TIMESTAMP WITH TIME ZONE NOT NULL,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Créer les index pour améliorer les performances
CREATE INDEX idx_glucose_user_id ON glucose_readings(user_id);
CREATE INDEX idx_glucose_measured_at ON glucose_readings(measured_at DESC);
CREATE INDEX idx_glucose_user_measured ON glucose_readings(user_id, measured_at DESC);

-- 5. Vérifier la nouvelle structure
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'glucose_readings'
ORDER BY ordinal_position;

-- 6. Afficher un message de succès
SELECT 'Table glucose_readings créée avec succès !' AS status;
