-- Seed data for internal consultation booking system

-- Insert sample users with department and position info
INSERT INTO users (name, email, password_hash, role, avatar_url, phone, bio, department, position, status) VALUES
-- Coaches
('张教练', 'zhang.coach@company.com', '$2b$10$example_hash_1', 'coach', '/placeholder.svg?height=64&width=64&text=张', '13800138001', '专注电商运营和社群营销，5年实战经验', '市场部', '高级运营专家', 'active'),
('李老师', 'li.teacher@company.com', '$2b$10$example_hash_2', 'coach', '/placeholder.svg?height=64&width=64&text=李', '13800138002', '资深投资顾问，专业财务规划师', '财务部', '投资顾问', 'active'),
('王导师', 'wang.mentor@company.com', '$2b$10$example_hash_3', 'coach', '/placeholder.svg?height=64&width=64&text=王', '13800138003', '短视频和直播领域专家', '内容部', '内容总监', 'active'),

-- Students
('李同学', 'li.student@company.com', '$2b$10$example_hash_4', 'student', '/placeholder.svg?height=64&width=64&text=李', '13900139001', '电商创业者，希望学习运营技巧', '业务部', '业务专员', 'active'),
('王同学', 'wang.student@company.com', '$2b$10$example_hash_5', 'student', '/placeholder.svg?height=64&width=64&text=王', '13900139002', '投资新手，想要学习理财知识', '财务部', '财务助理', 'active'),
('赵同学', 'zhao.student@company.com', '$2b$10$example_hash_6', 'student', '/placeholder.svg?height=64&width=64&text=赵', '13900139003', '内容创作者，专注短视频制作', '内容部', '内容编辑', 'active'),

-- Admin
('管理员', 'admin@company.com', '$2b$10$example_hash_7', 'admin', '/placeholder.svg?height=64&width=64&text=管', '13700137001', '系统管理员', 'IT部', '系统管理员', 'active');

-- Insert coach profiles (no pricing)
INSERT INTO coach_profiles (user_id, specialties, experience_years, description, rating, total_reviews, total_bookings, total_helped_students, is_available) VALUES
(1, ARRAY['电商运营', '社群营销', '内容创作'], 5, '专注电商运营和社群营销，帮助团队成员快速提升变现能力。拥有5年实战经验，成功指导过200+同事实现业务突破。', 4.9, 128, 156, 89, true),
(2, ARRAY['投资理财', '副业规划', '财务管理'], 8, '资深投资顾问，专业财务规划师，助力团队成员财富增长。持有CFP证书，为公司员工提供专业理财建议。', 4.8, 95, 120, 67, true),
(3, ARRAY['短视频制作', '直播带货', '品牌营销'], 6, '短视频和直播领域专家，帮助团队成员打造个人IP。曾负责公司多个爆款内容，单条视频最高播放量1000万+。', 4.7, 156, 200, 112, true);

-- Insert coach availability (next 7 days)
INSERT INTO coach_availability (coach_id, date, start_time, end_time, is_booked) VALUES
-- 张教练 (user_id: 1)
(1, CURRENT_DATE, '09:00', '09:30', false),
(1, CURRENT_DATE, '14:00', '14:30', false),
(1, CURRENT_DATE, '16:00', '16:30', false),
(1, CURRENT_DATE + 1, '10:00', '10:30', false),
(1, CURRENT_DATE + 1, '15:00', '15:30', false),

-- 李老师 (user_id: 2)
(2, CURRENT_DATE, '15:00', '15:30', false),
(2, CURRENT_DATE + 1, '09:00', '09:30', false),
(2, CURRENT_DATE + 1, '14:00', '14:30', false),
(2, CURRENT_DATE + 2, '11:00', '11:30', false),

-- 王导师 (user_id: 3)
(3, CURRENT_DATE, '17:00', '17:30', false),
(3, CURRENT_DATE + 1, '13:00', '13:30', false),
(3, CURRENT_DATE + 1, '16:00', '16:30', false),
(3, CURRENT_DATE + 2, '10:00', '10:30', false);

-- Insert sample bookings (no payment info)
INSERT INTO bookings (student_id, coach_id, booking_date, start_time, end_time, duration_minutes, topic, description, status, meeting_room) VALUES
-- Pending bookings
(4, 1, CURRENT_DATE, '14:00', '14:30', 30, '电商运营策略咨询', '希望了解如何提高店铺转化率', 'pending', '会议室A'),
(5, 2, CURRENT_DATE, '15:00', '15:30', 30, '投资理财规划', '想要制定个人投资计划', 'pending', '会议室B'),

-- Confirmed bookings
(6, 3, CURRENT_DATE + 1, '13:00', '13:30', 30, '短视频制作技巧', '学习短视频拍摄和剪辑技巧', 'confirmed', '会议室C'),
(4, 1, CURRENT_DATE + 1, '15:00', '15:30', 30, '社群营销方案', '讨论社群运营策略', 'confirmed', '会议室A'),

-- Completed bookings
(4, 1, CURRENT_DATE - 5, '14:00', '14:30', 30, '电商平台选择建议', '咨询适合的电商平台', 'completed', '会议室A'),
(5, 2, CURRENT_DATE - 3, '15:00', '15:30', 30, '理财产品分析', '分析不同理财产品的特点', 'completed', '会议室B');

-- Insert sample reviews with helpfulness scores
INSERT INTO reviews (booking_id, student_id, coach_id, rating, comment, helpfulness_score, problem_solved) VALUES
(5, 4, 1, 5, '非常有帮助的咨询，张教练给出了很多实用的建议！专业性很强，解答了我所有的疑问。', 5, true),
(6, 5, 2, 4, '专业的分析，帮助我更好地理解了不同理财产品的特点。李老师很耐心，讲解很清楚。', 4, true);

-- Insert sample notifications
INSERT INTO notifications (user_id, title, message, type, is_read, related_booking_id) VALUES
-- For coaches
(1, '新的预约请求', '李同学向您发起了预约请求，请及时处理', 'booking_request', false, 1),
(2, '新的预约请求', '王同学向您发起了预约请求，请及时处理', 'booking_request', false, 2),

-- For students
(4, '预约确认', '您的预约已被张教练确认，请准时参加咨询', 'booking_confirmed', false, 4),
(6, '预约确认', '您的预约已被王导师确认，请准时参加咨询', 'booking_confirmed', false, 3),

-- Reminder notifications
(4, '咨询提醒', '您与张教练的咨询将在1小时后开始，地点：会议室A', 'booking_reminder', false, 4),
(1, '咨询提醒', '您与李同学的咨询将在1小时后开始，地点：会议室A', 'booking_reminder', false, 1);

-- Insert system settings for internal use
INSERT INTO system_settings (setting_key, setting_value, description) VALUES
('booking_duration_default', '30', '默认预约时长（分钟）'),
('booking_advance_hours', '2', '预约需要提前的小时数'),
('notification_reminder_hours', '1', '预约提醒提前小时数'),
('max_bookings_per_day', '8', '教练每天最大预约数'),
('booking_cancellation_hours', '2', '预约取消最少提前小时数'),
('company_name', '生财深海圈', '公司名称'),
('system_type', 'internal', '系统类型：内部使用');

-- Insert team statistics
INSERT INTO team_statistics (date, total_consultations, problems_solved, average_rating, average_response_hours, satisfaction_rate) VALUES
(CURRENT_DATE - 30, 45, 42, 4.8, 1.5, 93.33),
(CURRENT_DATE - 29, 38, 36, 4.7, 2.0, 94.74),
(CURRENT_DATE - 28, 52, 48, 4.9, 1.2, 92.31),
(CURRENT_DATE - 27, 41, 39, 4.8, 1.8, 95.12),
(CURRENT_DATE - 26, 47, 44, 4.6, 2.2, 93.62);
