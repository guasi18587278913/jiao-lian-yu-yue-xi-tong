-- Seed data for the consultation booking system

-- Insert sample users
INSERT INTO users (name, email, password_hash, role, avatar_url, phone, bio, status) VALUES
-- Coaches
('张教练', 'zhang.coach@example.com', '$2b$10$example_hash_1', 'coach', '/placeholder.svg?height=64&width=64&text=张', '13800138001', '专注电商运营和社群营销，5年实战经验', 'active'),
('李老师', 'li.teacher@example.com', '$2b$10$example_hash_2', 'coach', '/placeholder.svg?height=64&width=64&text=李', '13800138002', '资深投资顾问，专业财务规划师', 'active'),
('王导师', 'wang.mentor@example.com', '$2b$10$example_hash_3', 'coach', '/placeholder.svg?height=64&width=64&text=王', '13800138003', '短视频和直播领域专家', 'active'),

-- Students
('李同学', 'li.student@example.com', '$2b$10$example_hash_4', 'student', '/placeholder.svg?height=64&width=64&text=李', '13900139001', '电商创业者，希望学习运营技巧', 'active'),
('王同学', 'wang.student@example.com', '$2b$10$example_hash_5', 'student', '/placeholder.svg?height=64&width=64&text=王', '13900139002', '投资新手，想要学习理财知识', 'active'),
('赵同学', 'zhao.student@example.com', '$2b$10$example_hash_6', 'student', '/placeholder.svg?height=64&width=64&text=赵', '13900139003', '内容创作者，专注短视频制作', 'active'),

-- Admin
('管理员', 'admin@example.com', '$2b$10$example_hash_7', 'admin', '/placeholder.svg?height=64&width=64&text=管', '13700137001', '系统管理员', 'active');

-- Insert coach profiles
INSERT INTO coach_profiles (user_id, specialties, experience_years, hourly_rate, description, rating, total_reviews, total_bookings, is_available) VALUES
(1, ARRAY['电商运营', '社群营销', '内容创作'], 5, 299.00, '专注电商运营和社群营销，帮助学员快速提升变现能力。拥有5年实战经验，成功指导过200+学员实现电商突破。', 4.9, 128, 156, true),
(2, ARRAY['投资理财', '副业规划', '财务管理'], 8, 399.00, '资深投资顾问，专业财务规划师，助力学员财富增长。持有CFP证书，管理资产超过5000万。', 4.8, 95, 120, true),
(3, ARRAY['短视频制作', '直播带货', '品牌营销'], 6, 199.00, '短视频和直播领域专家，帮助学员打造个人IP。曾服务多个知名品牌，单条视频最高播放量1000万+。', 4.7, 156, 200, true);

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

-- Insert sample bookings
INSERT INTO bookings (student_id, coach_id, booking_date, start_time, end_time, duration_minutes, topic, description, status, price) VALUES
-- Pending bookings
(4, 1, CURRENT_DATE, '14:00', '14:30', 30, '电商运营策略咨询', '希望了解如何提高店铺转化率', 'pending', 299.00),
(5, 2, CURRENT_DATE, '15:00', '15:30', 30, '投资理财规划', '想要制定个人投资计划', 'pending', 399.00),

-- Confirmed bookings
(6, 3, CURRENT_DATE + 1, '13:00', '13:30', 30, '短视频制作技巧', '学习短视频拍摄和剪辑技巧', 'confirmed', 199.00),
(4, 1, CURRENT_DATE + 1, '15:00', '15:30', 30, '社群营销方案', '讨论社群运营策略', 'confirmed', 299.00),

-- Completed bookings
(4, 1, CURRENT_DATE - 5, '14:00', '14:30', 30, '电商平台选择建议', '咨询适合的电商平台', 'completed', 299.00),
(5, 2, CURRENT_DATE - 3, '15:00', '15:30', 30, '理财产品分析', '分析不同理财产品的特点', 'completed', 399.00);

-- Insert sample reviews
INSERT INTO reviews (booking_id, student_id, coach_id, rating, comment) VALUES
(5, 4, 1, 5, '非常有帮助的咨询，张教练给出了很多实用的建议！专业性很强，解答了我所有的疑问。'),
(6, 5, 2, 4, '专业的分析，帮助我更好地理解了不同理财产品的特点。李老师很耐心，讲解很清楚。');

-- Insert sample notifications
INSERT INTO notifications (user_id, title, message, type, is_read, related_booking_id) VALUES
-- For coaches
(1, '新的预约请求', '李同学向您发起了预约请求，请及时处理', 'booking_request', false, 1),
(2, '新的预约请求', '王同学向您发起了预约请求，请及时处理', 'booking_request', false, 2),

-- For students
(4, '预约确认', '您的预约已被张教练确认，请准时参加咨询', 'booking_confirmed', false, 4),
(6, '预约确认', '您的预约已被王导师确认，请准时参加咨询', 'booking_confirmed', false, 3),

-- Reminder notifications
(4, '咨询提醒', '您与张教练的咨询将在1小时后开始', 'booking_reminder', false, 4),
(1, '咨询提醒', '您与李同学的咨询将在1小时后开始', 'booking_reminder', false, 1);

-- Insert system settings
INSERT INTO system_settings (setting_key, setting_value, description) VALUES
('booking_duration_default', '30', '默认预约时长（分钟）'),
('booking_advance_hours', '2', '预约需要提前的小时数'),
('notification_reminder_hours', '1', '预约提醒提前小时数'),
('platform_commission_rate', '0.10', '平台佣金比例'),
('max_bookings_per_day', '8', '教练每天最大预约数'),
('booking_cancellation_hours', '2', '预约取消最少提前小时数');
