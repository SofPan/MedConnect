-- Seed data for users table
INSERT INTO users (email, password_hash, is_clinic, created_at) VALUES
('patient1@example.com', 'hashed_password_1', FALSE, NOW()),
('patient2@example.com', 'hashed_password_2', FALSE, NOW()),
('patient3@example.com', 'hashed_password_3', FALSE, NOW()),
('clinic1@example.com', 'hashed_password_4', TRUE, NOW()),
('clinic2@example.com', 'hashed_password_5', TRUE, NOW()),
('clinic3@example.com', 'hashed_password_6', TRUE, NOW()),
('clinic4@example.com', 'hashed_password_7', TRUE, NOW()),
('clinic5@example.com', 'hashed_password_8', TRUE, NOW()),
('clinic6@example.com', 'hashed_password_9', TRUE, NOW()),
('clinic7@example.com', 'hashed_password_11', TRUE, NOW()),
('clinic8@example.com', 'hashed_password_12', TRUE, NOW());

-- Seed data for patients table
INSERT INTO patients (user_id, name, date_of_birth, gender, created_at) VALUES
(1, 'John Doe', '1990-05-15', 'Male', NOW()),
(2, 'Jane Smith', '1985-10-20', 'Female', NOW()),
(3, 'Michael Johnson', '1978-03-08', 'Male', NOW()),
(4, 'Emily Brown', '2000-12-03', 'Female', NOW()),
(5, 'David Wilson', '1995-08-25', 'Male', NOW());

-- Seed data for clinics table
INSERT INTO clinics (name, user_id, address, created_at) VALUES
('City Medical Center', 4, '4G Spadina Ave., Toronto, ON M5V 3Z9', NOW()),
('Suburb Clinic', 5, '486 Front St W Lower Ground, Unit 14, Toronto, ON M5V 0V2', NOW()),
('Rural Health Clinic', 6, '39 Lower Simcoe St, Toronto, ON M5J 3A6', NOW()),
('Urban Family Clinic', 7, '1154 Danforth Ave, Toronto, ON M4J 1M3', NOW()),
('Pediatric Clinic', 8, '550 Queens Quay W, Toronto, ON M5V 3M8', NOW()),
('Monarch Park Clinic', 9, '840 Coxwell Ave #205, Toronto, ON M4C 5T2', NOW()),
('Albany Medical Clinic', 10, '807 Broadview Ave, Toronto, ON M4K 2P8', NOW()),
('Paper & Danforth Community Care Clinic', 11, '752 Danforth Ave, Toronto, ON M4J 1L5', NOW());

-- Seed data for doctors table
INSERT INTO doctors (clinic_id, name, specialty, qualifications, description, photo_url, number_of_patients, created_at) VALUES
(1, 'Dr. Smith', 'General Medicine', 'MD, MBBS', 'Experienced general practitioner.', 'smith.jpg', 20, NOW()),
(2, 'Dr. Johnson', 'Pediatrics', 'MD, DNB', 'Specializes in pediatric care.', 'johnson.jpg', 15, NOW()),
(3, 'Dr. Brown', 'Cardiology', 'MD, PhD', 'Expert in cardiology.', 'brown.jpg', 25, NOW()),
(4, 'Dr. Wilson', 'Orthopedics', 'MS Ortho', 'Orthopedic specialist.', 'wilson.jpg', 10, NOW()),
(5, 'Dr. Davis', 'Dermatology', 'MD, DNB', 'Specializes in dermatological care.', 'davis.jpg', 30, NOW());

-- Seed data for appointments table
INSERT INTO appointments (patient_id, doctor_id, details, clinic_id, status, created_at) VALUES
(1, 1, '2024-05-01 10:00:00', 1, TRUE, NOW()),
(2, 2, '2024-05-03 14:00:00', 2, TRUE, NOW()),
(3, 3, '2024-05-05 11:30:00', 3, FALSE, NOW()),
(4, 4, '2024-05-06 09:45:00', 4, FALSE, NOW()),
(5, 5, '2024-05-08 13:15:00', 5, TRUE, NOW());

-- Seed data for documents table
INSERT INTO documents (patient_id, document_name, document_url, created_at) VALUES
(1, 'Medical History', 'history.pdf', NOW()),
(2, 'Prescription', 'prescription.pdf', NOW()),
(3, 'Lab Report', 'lab_report.pdf', NOW()),
(4, 'X-Ray Image', 'xray.jpg', NOW()),
(5, 'Insurance Card', 'insurance_card.pdf', NOW());
