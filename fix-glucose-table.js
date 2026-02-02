// Script pour corriger la structure de la table glucose_readings
// Date : 2 février 2026

import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Charger les variables d'environnement
dotenv.config({ path: join(__dirname, '.env') });

const pool = new Pool({
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT || '5432'),
  database: process.env.DATABASE_NAME || 'stopdiabete',
  user: process.env.DATABASE_USER || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'stopdiabete2026',
});

async function fixGlucoseTable() {
  const client = await pool.connect();
  
  try {
    console.log('🔧 Connexion à la base de données...');
    
    // 1. Vérifier la structure actuelle
    console.log('\n📋 Structure actuelle de la table glucose_readings :');
    const currentStructure = await client.query(`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_name = 'glucose_readings'
      ORDER BY ordinal_position
    `);
    
    if (currentStructure.rows.length > 0) {
      console.table(currentStructure.rows);
    } else {
      console.log('❌ La table n\'existe pas encore');
    }
    
    // 2. Supprimer l'ancienne table
    console.log('\n🗑️  Suppression de l\'ancienne table...');
    await client.query('DROP TABLE IF EXISTS glucose_readings CASCADE');
    console.log('✅ Ancienne table supprimée');
    
    // 3. Créer la nouvelle table avec la bonne structure
    console.log('\n🏗️  Création de la nouvelle table...');
    await client.query(`
      CREATE TABLE glucose_readings (
        id UUID PRIMARY KEY,
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        value NUMERIC(5,2) NOT NULL CHECK (value >= 20 AND value <= 600),
        measurement_type VARCHAR(20) NOT NULL CHECK (measurement_type IN ('fasting', 'after_meal', 'before_meal', 'before_sleep', 'random')),
        measured_at TIMESTAMP WITH TIME ZONE NOT NULL,
        notes TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Nouvelle table créée');
    
    // 4. Créer les index
    console.log('\n📊 Création des index...');
    await client.query('CREATE INDEX idx_glucose_user_id ON glucose_readings(user_id)');
    await client.query('CREATE INDEX idx_glucose_measured_at ON glucose_readings(measured_at DESC)');
    await client.query('CREATE INDEX idx_glucose_user_measured ON glucose_readings(user_id, measured_at DESC)');
    console.log('✅ Index créés');
    
    // 5. Vérifier la nouvelle structure
    console.log('\n📋 Nouvelle structure de la table glucose_readings :');
    const newStructure = await client.query(`
      SELECT column_name, data_type, is_nullable, character_maximum_length
      FROM information_schema.columns
      WHERE table_name = 'glucose_readings'
      ORDER BY ordinal_position
    `);
    console.table(newStructure.rows);
    
    // 6. Vérifier les contraintes
    console.log('\n🔒 Contraintes de la table :');
    const constraints = await client.query(`
      SELECT constraint_name, constraint_type
      FROM information_schema.table_constraints
      WHERE table_name = 'glucose_readings'
    `);
    console.table(constraints.rows);
    
    console.log('\n✅ Table glucose_readings corrigée avec succès !');
    console.log('\n📝 Vous pouvez maintenant :');
    console.log('   1. Redémarrer les serveurs : ./start-dev.sh');
    console.log('   2. Tester l\'ajout de glycémie sur http://localhost:3000/glucose');
    
  } catch (error) {
    console.error('\n❌ Erreur lors de la correction :', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

// Exécuter le script
fixGlucoseTable()
  .then(() => {
    console.log('\n🎉 Script terminé avec succès !');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Erreur fatale :', error);
    process.exit(1);
  });
