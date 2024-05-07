-- Seed data for users table
INSERT INTO users (email, password_hash, is_clinic, created_at) VALUES
('patient1@example.com', 'hashed_password_1', FALSE, NOW()),
('patient2@example.com', 'hashed_password_2', FALSE, NOW()),
('patient3@example.com', 'hashed_password_3', FALSE, NOW()),
('patient4@example.com', 'hashed_password_4', FALSE, NOW()),
('patient5@example.com', 'hashed_password_5', FALSE, NOW()),
('patient6@example.com', 'hashed_password_6', FALSE, NOW()),
('patient7@example.com', 'hashed_password_7', FALSE, NOW()),
('patient8@example.com', 'hashed_password_8', FALSE, NOW()),
('patient9@example.com', 'hashed_password_9', FALSE, NOW()),
('patient10@example.com', 'hashed_password_10', FALSE, NOW()),
('patient11@example.com', 'hashed_password_11', FALSE, NOW()),
('patient12@example.com', 'hashed_password_12', FALSE, NOW()),
('patient13@example.com', 'hashed_password_13', FALSE, NOW()),
('patient14@example.com', 'hashed_password_14', FALSE, NOW()),
('patient15@example.com', 'hashed_password_15', FALSE, NOW()),
('patient16@example.com', 'hashed_password_16', FALSE, NOW()),
('patient17@example.com', 'hashed_password_17', FALSE, NOW()),
('patient18@example.com', 'hashed_password_18', FALSE, NOW()),
('patient19@example.com', 'hashed_password_19', FALSE, NOW()),
('patient20@example.com', 'hashed_password_20', FALSE, NOW()),
('clinic1@example.com', 'hashed_password_21', TRUE, NOW()),
('clinic2@example.com', 'hashed_password_22', TRUE, NOW()),
('clinic3@example.com', 'hashed_password_23', TRUE, NOW()),
('clinic4@example.com', 'hashed_password_24', TRUE, NOW()),
('clinic5@example.com', 'hashed_password_25', TRUE, NOW()),
('clinic6@example.com', 'hashed_password_26', TRUE, NOW()),
('clinic7@example.com', 'hashed_password_27', TRUE, NOW()),
('clinic8@example.com', 'hashed_password_28', TRUE, NOW()),
('clinic9@example.com', 'hashed_password_29', TRUE, NOW()),
('clinic10@example.com', 'hashed_password_30', TRUE, NOW());

-- Seed data for patients table
INSERT INTO patients (user_id, name, date_of_birth, gender, created_at) VALUES
(1, 'John Doe', '1990-05-15', 'Male', NOW()),
(2, 'Jane Smith', '1985-10-20', 'Female', NOW()),
(3, 'Michael Johnson', '1978-03-08', 'Male', NOW()),
(4, 'Emily Brown', '2000-12-03', 'Female', NOW()),
(5, 'David Wilson', '1995-08-25', 'Male', NOW()),
(6, 'Sarah Jones', '1992-06-18', 'Female', NOW()),
(7, 'Matthew Davis', '1983-09-10', 'Male', NOW()),
(8, 'Jennifer Garcia', '1976-04-22', 'Female', NOW()),
(9, 'Daniel Martinez', '1998-11-30', 'Male', NOW()),
(10, 'Jessica Rodriguez', '1991-07-12', 'Female', NOW()),
(11, 'Christopher Hernandez', '1980-02-05', 'Male', NOW()),
(12, 'Amanda Wilson', '1997-10-15', 'Female', NOW()),
(13, 'James Lee', '1989-03-28', 'Male', NOW()),
(14, 'Elizabeth Taylor', '1973-12-10', 'Female', NOW()),
(15, 'Andrew Clark', '1993-05-20', 'Male', NOW()),
(16, 'Lauren Martinez', '1987-08-08', 'Female', NOW()),
(17, 'Kevin Thompson', '1979-01-25', 'Male', NOW()),
(18, 'Megan White', '1996-07-04', 'Female', NOW()),
(19, 'Ryan Adams', '1984-11-17', 'Male', NOW()),
(20, 'Stephanie Harris', '1975-02-28', 'Female', NOW());

-- Seed data for clinics table
INSERT INTO clinics (name, user_id, address, latitude, longitude, created_at) VALUES
('City Medical Center', 21, '4G Spadina Ave., Toronto, ON M5V 3Z9', 43.645805, -79.395478, NOW()),
('Suburb Clinic', 22, '486 Front St W Lower Ground, Unit 14, Toronto, ON M5V 0V2', 43.644165, -79.395871, NOW()),
('Rural Health Clinic', 23, '39 Lower Simcoe St, Toronto, ON M5J 3A6', 43.641302, -79.383038, NOW()),
('Urban Family Clinic', 24, '1154 Danforth Ave, Toronto, ON M4J 1M3', 43.681451, -79.330554, NOW()),
('Pediatric Clinic', 25, '550 Queens Quay W, Toronto, ON M5V 3M8', 43.638604, -79.397257, NOW()),
('Monarch Park Clinic', 26, '840 Coxwell Ave #205, Toronto, ON M4C 5T2', 43.689966, -79.319005, NOW()),
('Albany Medical Clinic', 27, '807 Broadview Ave, Toronto, ON M4K 2P8', 43.678592, -79.356754, NOW()),
('Paper & Danforth Community Care Clinic', 28, '752 Danforth Ave, Toronto, ON M4J 1L5', 43.678378, -79.348994, NOW()),
('Lakeview Clinic', 29, '1112 Queen St W, Toronto, ON M6J 1H9', 43.643738, -79.420162, NOW()),
('West End Medical Center', 30, '690 Parkside Dr, Toronto, ON M6G 1P1', 43.663874, -79.468666, NOW());


-- Seed data for doctors table
INSERT INTO doctors (clinic_id, name, specialty, qualifications, description, photo_url, number_of_patients, created_at) VALUES
(1, 'Dr. Smith', 'General Medicine', 'MD, MBBS', 'Experienced general practitioner.', 'smith.jpg', 20, NOW()),
(2, 'Dr. Johnson', 'Pediatrics', 'MD, DNB', 'Specializes in pediatric care.', 'johnson.jpg', 15, NOW()),
(3, 'Dr. Brown', 'Cardiology', 'MD, PhD', 'Expert in cardiology.', 'brown.jpg', 25, NOW()),
(4, 'Dr. Wilson', 'Orthopedics', 'MS Ortho', 'Orthopedic specialist.', 'wilson.jpg', 10, NOW()),
(5, 'Dr. Davis', 'Dermatology', 'MD, DNB', 'Specializes in dermatological care.', 'davis.jpg', 30, NOW()),
(5, 'Dr. Davidson', 'General Medicine', 'MD, DNB', 'General practitioner.', 'davidson.jpg', 5, NOW()),
(6, 'Dr. Martinez', 'Obstetrics & Gynecology', 'MD, MBBS', 'Experienced in womens health.', 'martinez.jpg', 18, NOW()),
(7, 'Dr. Rodriguez', 'Ophthalmology', 'MD, DNB', 'Specializes in eye care.', 'rodriguez.jpg', 22, NOW()),
(8, 'Dr. Garcia', 'Neurology', 'MD, PhD', 'Expert in neurological disorders.', 'garcia.jpg', 12, NOW()),
(9, 'Dr. Lopez', 'Psychiatry', 'MD, DNB', 'Specializes in mental health.', 'lopez.jpg', 28, NOW()),
(10, 'Dr. Flores', 'Endocrinology', 'MD, MBBS', 'Expert in hormonal disorders.', 'flores.jpg', 15, NOW());

-- Seed data for appointments table
INSERT INTO appointments (patient_id, doctor_id, details, clinic_id, status, created_at) VALUES
(1, 6, '2024-05-02 09:00:00', 1, TRUE, NOW()),
(2, 7, '2024-05-02 11:30:00', 1, TRUE, NOW()),
(3, 8, '2024-05-03 13:00:00', 1, FALSE, NOW()),
(4, 9, '2024-05-03 15:30:00', 1, FALSE, NOW()),
(5, 10, '2024-05-04 10:45:00', 1, TRUE, NOW()),
(6, 6, '2024-05-04 14:00:00', 1, TRUE, NOW()),
(7, 7, '2024-05-05 08:30:00', 1, FALSE, NOW()),
(8, 8, '2024-05-05 12:15:00', 1, TRUE, NOW()),
(9, 9, '2024-05-06 09:45:00', 1, FALSE, NOW()),
(10, 10, '2024-05-06 15:00:00', 1, TRUE, NOW()),
(11, 6, '2024-05-02 09:00:00', 1, TRUE, NOW()),
(12, 7, '2024-05-02 11:30:00', 1, TRUE, NOW()),
(13, 8, '2024-05-03 13:00:00', 1, FALSE, NOW()),
(14, 9, '2024-05-03 15:30:00', 1, FALSE, NOW()),
(15, 10, '2024-05-04 10:45:00', 1, TRUE, NOW()),
(16, 6, '2024-05-04 14:00:00', 1, TRUE, NOW()),
(17, 7, '2024-05-05 08:30:00', 1, FALSE, NOW()),
(18, 8, '2024-05-05 12:15:00', 1, TRUE, NOW()),
(19, 9, '2024-05-06 09:45:00', 1, FALSE, NOW()),
(20, 10, '2024-05-06 15:00:00', 1, TRUE, NOW()),
-- unbooked appointments
(null, 6, '2024-05-05 08:30:00', 1, FALSE, NOW()),
(null, 7, '2024-05-05 12:15:00', 1, FALSE, NOW()),
(null, 8, '2024-05-06 09:45:00', 1, FALSE, NOW());

-- Seed data for documents table
INSERT INTO documents (patient_id, document_name, document_url, created_at) VALUES
(1, 'Medical History', 'history.pdf', NOW()),
(2, 'Prescription', 'prescription.pdf', NOW()),
(3, 'Lab Report', 'lab_report.pdf', NOW()),
(4, 'X-Ray Image', 'xray.jpg', NOW()),
(5, 'Insurance Card', 'insurance_card.pdf', NOW());
