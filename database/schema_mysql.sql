-- StopDiabète Database Schema for MySQL
-- Compatible with Hostinger MySQL databases

-- Users table
CREATE TABLE users (
    id VARCHAR(36) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    date_of_birth DATE,
    gender ENUM('male', 'female', 'other'),
    phone VARCHAR(20),
    diabetes_type ENUM('type1', 'type2', 'gestational', 'prediabetes', 'none'),
    diagnosis_date DATE,
    has_family_history BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Glucose readings table
CREATE TABLE glucose_readings (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    glucose_value DECIMAL(5,2) NOT NULL,
    measurement_time TIMESTAMP NOT NULL,
    measurement_context ENUM('fasting', 'before_meal', 'after_meal', 'bedtime', 'random') NOT NULL,
    notes TEXT,
    food_consumed TEXT,
    medication_taken VARCHAR(255),
    physical_activity VARCHAR(255),
    symptoms TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_measurement_time (measurement_time),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Risk assessments table
CREATE TABLE risk_assessments (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    assessment_date TIMESTAMP NOT NULL,
    age INT NOT NULL,
    weight DECIMAL(5,2) NOT NULL,
    height DECIMAL(5,2) NOT NULL,
    bmi DECIMAL(5,2) NOT NULL,
    waist_circumference DECIMAL(5,2),
    has_family_history BOOLEAN DEFAULT FALSE,
    has_gestational_diabetes BOOLEAN DEFAULT FALSE,
    physical_activity_level ENUM('low', 'moderate', 'high') NOT NULL,
    diet_quality ENUM('poor', 'average', 'good') NOT NULL,
    smoking_status BOOLEAN DEFAULT FALSE,
    has_hypertension BOOLEAN DEFAULT FALSE,
    fasting_glucose DECIMAL(5,2),
    random_glucose DECIMAL(5,2),
    total_risk_score INT NOT NULL,
    risk_level ENUM('low', 'moderate', 'high', 'very_high') NOT NULL,
    recommendations JSON,
    factors JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_assessment_date (assessment_date),
    INDEX idx_risk_level (risk_level)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert a test user (password: Test1234)
INSERT INTO users (
    id, 
    email, 
    password_hash, 
    first_name, 
    last_name, 
    has_family_history
) VALUES (
    UUID(),
    'test@stopdiabete.com',
    '$2a$10$XqK5Z9YvxXYJ8qh5H5OoUe7vVjZq7z4vZq7z4vZq7z4vZq7z4vZq7',
    'Test',
    'User',
    FALSE
);

-- Show created tables
SHOW TABLES;

-- Show users count
SELECT COUNT(*) as user_count FROM users;
