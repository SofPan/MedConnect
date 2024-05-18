-- Seed data for users table
INSERT INTO users (email, password_hash, is_clinic, created_at) VALUES
('patient@example.com', '123', FALSE, NOW()),
('patient2@example.com', '123', FALSE, NOW()),
('patient3@example.com', '123', FALSE, NOW()),
('patient4@example.com', '123', FALSE, NOW()),
('patient5@example.com', '123', FALSE, NOW()),
('clinic@example.com', '123', TRUE, NOW()),
('clinic2@example.com', '123', TRUE, NOW()),
('clinic3@example.com', '123', TRUE, NOW()),
('clinic4@example.com', '123', TRUE, NOW()),
('clinic5@example.com', '123', TRUE, NOW()),
('clinic6@example.com', '123', TRUE, NOW()),
('clinic7@example.com', '123', TRUE, NOW()),
('clinic8@example.com', '123', TRUE, NOW()),
('clinic9@example.com', '123', TRUE, NOW()),
('clinic10@example.com', '123', TRUE, NOW());

-- Seed data for clinics table
INSERT INTO clinics (name, user_id, address, latitude, longitude, created_at) VALUES
('City Medical Center', 6, '13 Mckayfield Rd, East York, ON M4J 4P6', 43.692238730094196, -79.3313392379914, NOW()),
('West End Medical Center', 7, '495 Jarvis St, Toronto, ON M4Y 2G8', 43.6660108376062, -79.37701143891665, NOW()),
('Suburb Clinic', 8, '105 McCaul St, Toronto, ON M5T 2X4', 43.65377114804735, -79.39084943620604, NOW()),
('Rural Health Clinic', 9, '39 Lower Simcoe St, Toronto, ON M5J 3A6', 43.641302, -79.383038, NOW()),
('Urban Family Clinic', 10, '1154 Danforth Ave, Toronto, ON M4J 1M3', 43.681451, -79.330554, NOW()),
('Pediatric Clinic', 11, '550 Queens Quay W, Toronto, ON M5V 3M8', 43.638604, -79.397257, NOW()),
('Monarch Park Clinic', 12, '840 Coxwell Ave #205, Toronto, ON M4C 5T2', 43.689966, -79.319005, NOW()),
('Albany Medical Clinic', 13, '807 Broadview Ave, Toronto, ON M4K 2P8', 43.678592, -79.356754, NOW()),
('Paper & Danforth Community Care Clinic', 14, '752 Danforth Ave, Toronto, ON M4J 1L5', 43.678378, -79.348994, NOW()),
('Lakeview Clinic', 15, '1112 Queen St W, Toronto, ON M6J 1H9', 43.643738, -79.420162, NOW());

-- Seed data for doctors table
INSERT INTO doctors (clinic_id, name, specialty, qualifications, description, photo_url, number_of_patients, created_at) VALUES
(1, 'Dr. Smith', 'General Medicine', 'MD, MBBS', 'Experienced general practitioner.', 'smith.jpg', 3, NOW()),
(1, 'Dr. Brown', 'Pediatrics', 'MD, DNB', 'Specializes in pediatric care.', 'brown.jpg', 5, NOW()),
(1, 'Dr. Johnson', 'Cardiology', 'MD, PhD', 'Expert in cardiology.', 'johnson.jpg', 7, NOW()),
(2, 'Dr. Davidson', 'General Medicine', 'MD, DNB', 'General practitioner.', 'davidson.jpg', 5, NOW()),
(2, 'Dr. Martinez', 'Obstetrics & Gynecology', 'MD, MBBS', 'Experienced in womens health.', 'martinez.jpg', 8, NOW()),
(3, 'Dr. Rodriguez', 'Ophthalmology', 'MD, DNB', 'Specializes in eye care.', 'rodriguez.jpg', 7, NOW()),
(3, 'Dr. Garcia', 'Neurology', 'MD, PhD', 'Expert in neurological disorders.', 'garcia.jpg', 2, NOW()),
(4, 'Dr. Lopez', 'Psychiatry', 'MD, DNB', 'Specializes in mental health.', 'lopez.jpg', 9, NOW()),
(4, 'Dr. Flores', 'Endocrinology', 'MD, MBBS', 'Expert in hormonal disorders.', 'flores.jpg', 10, NOW()),
(5, 'Dr. Walker', 'General Medicine', 'MD, MBBS', 'Experienced general practitioner.', 'walker.jpg', 3, NOW()),
(5, 'Dr. King', 'Pediatrics', 'MD, DNB', 'Specializes in pediatric care.', 'king.jpg', 4, NOW()),
(6, 'Dr. Green', 'Cardiology', 'MD, PhD', 'Expert in cardiology.', 'green.jpg', 5, NOW()),
(6, 'Dr. Wilson', 'Orthopedics', 'MS Ortho', 'Orthopedic specialist.', 'wilson.jpg', 11, NOW()),
(7, 'Dr. Davis', 'Dermatology', 'MD, DNB', 'Specializes in dermatological care.', 'davis.jpg', 4, NOW()),
(7, 'Dr. Carter', 'General Medicine', 'MD, DNB', 'General practitioner.', 'carter.jpg', 8, NOW()),
(8, 'Dr. Bailey', 'Obstetrics & Gynecology', 'MD, MBBS', 'Experienced in womens health.', 'bailey.jpg', 9, NOW()),
(8, 'Dr. Scott', 'Ophthalmology', 'MD, DNB', 'Specializes in eye care.', 'scott.jpg', 7, NOW()),
(9, 'Dr. Adams', 'Neurology', 'MD, PhD', 'Expert in neurological disorders.', 'adams.jpg', 6, NOW()),
(9, 'Dr. Parker', 'Psychiatry', 'MD, DNB', 'Specializes in mental health.', 'parker.jpg', 4, NOW()),
(10, 'Dr. Mitchell', 'Orthopedics', 'MS Ortho', 'Orthopedic specialist.', 'mitchell.jpg', 5, NOW()),
(10, 'Dr. Reed', 'Dermatology', 'MD, DNB', 'Specializes in dermatological care.', 'reed.jpg', 10, NOW());


-- Seed data for patients table
INSERT INTO patients (user_id, name, date_of_birth, gender, health_card, doctor_id, created_at) VALUES
(1, 'John Doe', '1990-05-15', 'Male', '1234567890', 1, NOW()),
(2, 'Jane Smith', '1985-10-20', 'Female', '0987654321', 2, NOW()),
(3, 'Michael Johnson', '1978-03-08', 'Male', '5678901234', 2, NOW()),
(4, 'Emily Brown', '2000-12-03', 'Female', '4321098765', 3, NOW()),
(5, 'David Wilson', '1995-08-25', 'Male', '9876543210', 3, NOW());


-- Seed data for appointments table

INSERT INTO appointments (patient_id, doctor_id, patient_name, doctor_name, start_time, end_time, clinic_id, clinic_name, status, created_at)
VALUES
    (1, 1, 'John Doe', 'Dr. Smith', '2024-05-02 09:00:00', '2024-05-02 10:00:00', 1, 'City Medical Center', TRUE, NOW()),
    (2, 2, 'Jane Smith', 'Dr. Brown', '2024-05-02 11:30:00', '2024-05-02 12:30:00', 1, 'City Medical Center', TRUE, NOW()),
    (3, 2, 'Michael Johnson', 'Dr. Brown', '2024-05-03 13:00:00', '2024-05-03 14:00:00', 1, 'City Medical Center', FALSE, NOW()),
    (4, 3, 'Emily Brown', 'Dr. Johnson', '2024-05-03 15:30:00', '2024-05-03 16:30:00', 1, 'City Medical Center', FALSE, NOW()),
    (5, 3, 'David Wilson', 'Dr. Johnson', '2024-05-04 10:45:00', '2024-05-04 11:45:00', 1, 'City Medical Center', TRUE, NOW()),
    (null, 1, null, 'Dr. Smith', '2024-05-15 09:00:00', '2024-05-15 10:00:00', 1, 'City Medical Center', TRUE, NOW()),
    (null, 2, null, 'Dr. Brown', '2024-05-16 09:00:00', '2024-05-16 10:00:00', 1, 'City Medical Center', TRUE, NOW()),
    (null, 3, null, 'Dr. Johnson', '2024-05-16 12:00:00', '2024-05-16 13:00:00', 1, 'City Medical Center', TRUE, NOW());





-- Seed data for documents table
INSERT INTO documents (patient_id, document_name, document_url, created_at) VALUES
(1, 'Medical History', 'history.pdf', NOW()),
(2, 'Prescription', 'prescription.pdf', NOW()),
(3, 'Lab Report', 'lab_report.pdf', NOW()),
(4, 'X-Ray Image', 'xray.jpg', NOW()),
(5, 'Insurance Card', 'insurance_card.pdf', NOW());

-- Seed data for pending_requests table
INSERT INTO pending_requests (request_type, patient_id, clinic_id, doctor_id, appointment_id, created_at) VALUES
('register', 1, 1, 1, null, NOW()),
('change_doctor', 1, 1, 2, null, NOW()),
('appointment', 2, 1, 2, 2, NOW());
