-- Create database schema for internal consultation booking system (no payment)

-- Users table (for both students and coaches)
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('student', 'coach', 'admin')),
    avatar_url VARCHAR(500),
    phone VARCHAR(20),
    bio TEXT,
    department VARCHAR(100), -- 部门信息
    position VARCHAR(100), -- 职位信息
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Coach profiles table (additional info for coaches)
CREATE TABLE IF NOT EXISTS coach_profiles (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    specialties TEXT[], -- Array of specialties
    experience_years INTEGER,
    description TEXT,
    rating DECIMAL(3,2) DEFAULT 0.00,
    total_reviews INTEGER DEFAULT 0,
    total_bookings INTEGER DEFAULT 0,
    total_helped_students INTEGER DEFAULT 0, -- 帮助的学员数量
    is_available BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Available time slots for coaches
CREATE TABLE IF NOT EXISTS coach_availability (
    id SERIAL PRIMARY KEY,
    coach_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    is_booked BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bookings table (no payment fields)
CREATE TABLE IF NOT EXISTS bookings (
    id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    coach_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    booking_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    duration_minutes INTEGER DEFAULT 30,
    topic VARCHAR(255),
    description TEXT,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled', 'rejected')),
    meeting_link VARCHAR(500),
    meeting_room VARCHAR(100), -- 会议室信息
    notes TEXT, -- 咨询记录
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Reviews and ratings
CREATE TABLE IF NOT EXISTS reviews (
    id SERIAL PRIMARY KEY,
    booking_id INTEGER REFERENCES bookings(id) ON DELETE CASCADE,
    student_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    coach_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    helpfulness_score INTEGER CHECK (helpfulness_score >= 1 AND helpfulness_score <= 5), -- 帮助程度评分
    problem_solved BOOLEAN DEFAULT false, -- 问题是否解决
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) NOT NULL, -- 'booking_request', 'booking_confirmed', 'booking_reminder', etc.
    is_read BOOLEAN DEFAULT false,
    related_booking_id INTEGER REFERENCES bookings(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- System settings
CREATE TABLE IF NOT EXISTS system_settings (
    id SERIAL PRIMARY KEY,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Team statistics (for internal tracking)
CREATE TABLE IF NOT EXISTS team_statistics (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    total_consultations INTEGER DEFAULT 0,
    problems_solved INTEGER DEFAULT 0,
    average_rating DECIMAL(3,2) DEFAULT 0.00,
    average_response_hours DECIMAL(5,2) DEFAULT 0.00,
    satisfaction_rate DECIMAL(5,2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_department ON users(department);
CREATE INDEX IF NOT EXISTS idx_coach_availability_coach_date ON coach_availability(coach_id, date);
CREATE INDEX IF NOT EXISTS idx_bookings_student_id ON bookings(student_id);
CREATE INDEX IF NOT EXISTS idx_bookings_coach_id ON bookings(coach_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(booking_date);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_team_statistics_date ON team_statistics(date);
