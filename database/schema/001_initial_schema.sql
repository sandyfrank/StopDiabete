-- StopDiabete Database Schema
-- Version: 0.1.0
-- Date: 2026-02-02

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    date_of_birth DATE,
    gender VARCHAR(20),
    phone VARCHAR(20),
    
    -- Medical information
    diabetes_type VARCHAR(20), -- 'type1', 'type2', 'gestational', 'prediabetes', 'none'
    diagnosis_date DATE,
    has_family_history BOOLEAN DEFAULT FALSE,
    
    -- Account status
    is_active BOOLEAN DEFAULT TRUE,
    is_verified BOOLEAN DEFAULT FALSE,
    email_verified_at TIMESTAMP,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login_at TIMESTAMP
);

-- Glucose readings table
CREATE TABLE glucose_readings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Reading data
    glucose_value DECIMAL(5, 2) NOT NULL, -- mg/dL
    measurement_time TIMESTAMP NOT NULL,
    measurement_context VARCHAR(50), -- 'fasting', 'before_meal', 'after_meal', 'bedtime', 'random'
    
    -- Optional information
    notes TEXT,
    food_consumed TEXT,
    medication_taken TEXT,
    physical_activity TEXT,
    symptoms TEXT,
    
    -- Metadata
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Risk assessments table
CREATE TABLE risk_assessments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Assessment data
    assessment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Risk factors (0-10 scale or boolean)
    age_score INTEGER,
    bmi_score INTEGER,
    waist_circumference DECIMAL(5, 2),
    physical_activity_score INTEGER,
    diet_score INTEGER,
    family_history_score INTEGER,
    hypertension_score INTEGER,
    
    -- Calculated risk
    total_risk_score INTEGER NOT NULL,
    risk_level VARCHAR(20) NOT NULL, -- 'low', 'moderate', 'high', 'very_high'
    
    -- Recommendations
    recommendations JSONB,
    
    -- Metadata
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Reminders table
CREATE TABLE reminders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Reminder details
    title VARCHAR(200) NOT NULL,
    description TEXT,
    reminder_type VARCHAR(50) NOT NULL, -- 'glucose_check', 'medication', 'appointment', 'exercise', 'custom'
    
    -- Scheduling
    reminder_time TIME NOT NULL,
    frequency VARCHAR(20) NOT NULL, -- 'daily', 'weekly', 'monthly', 'custom'
    days_of_week INTEGER[], -- Array of days (0=Sunday, 6=Saturday)
    
    -- Status
    is_active BOOLEAN DEFAULT TRUE,
    last_triggered_at TIMESTAMP,
    next_trigger_at TIMESTAMP,
    
    -- Metadata
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Articles table
CREATE TABLE articles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- Content
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    summary TEXT,
    content TEXT NOT NULL,
    featured_image_url VARCHAR(500),
    
    -- Classification
    category VARCHAR(50) NOT NULL, -- 'prevention', 'nutrition', 'exercise', 'medication', 'lifestyle'
    tags VARCHAR(50)[],
    target_audience VARCHAR(50)[], -- 'type1', 'type2', 'prediabetes', 'at_risk', 'general'
    
    -- Metadata
    author VARCHAR(100),
    reading_time_minutes INTEGER,
    is_published BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMP,
    views_count INTEGER DEFAULT 0,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User preferences table
CREATE TABLE user_preferences (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    
    -- Display preferences
    language VARCHAR(10) DEFAULT 'fr',
    theme VARCHAR(20) DEFAULT 'light', -- 'light', 'dark', 'auto'
    glucose_unit VARCHAR(10) DEFAULT 'mg/dL', -- 'mg/dL' or 'mmol/L'
    
    -- Notification preferences
    notifications_enabled BOOLEAN DEFAULT TRUE,
    email_notifications BOOLEAN DEFAULT TRUE,
    push_notifications BOOLEAN DEFAULT FALSE,
    
    -- Target ranges
    target_glucose_min DECIMAL(5, 2) DEFAULT 70,
    target_glucose_max DECIMAL(5, 2) DEFAULT 130,
    
    -- Privacy
    share_data_for_research BOOLEAN DEFAULT FALSE,
    
    -- Metadata
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_glucose_readings_user_id ON glucose_readings(user_id);
CREATE INDEX idx_glucose_readings_measurement_time ON glucose_readings(measurement_time DESC);
CREATE INDEX idx_risk_assessments_user_id ON risk_assessments(user_id);
CREATE INDEX idx_risk_assessments_date ON risk_assessments(assessment_date DESC);
CREATE INDEX idx_reminders_user_id ON reminders(user_id);
CREATE INDEX idx_reminders_next_trigger ON reminders(next_trigger_at) WHERE is_active = TRUE;
CREATE INDEX idx_articles_published ON articles(published_at DESC) WHERE is_published = TRUE;
CREATE INDEX idx_articles_category ON articles(category);

-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_glucose_readings_updated_at BEFORE UPDATE ON glucose_readings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reminders_updated_at BEFORE UPDATE ON reminders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_articles_updated_at BEFORE UPDATE ON articles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_preferences_updated_at BEFORE UPDATE ON user_preferences
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
