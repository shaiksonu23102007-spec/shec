CREATE DATABASE IF NOT EXISTS shec_college;
USE shec_college;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(120) NOT NULL,
  email VARCHAR(120) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('student','faculty','admin') NOT NULL DEFAULT 'student',
  phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS departments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  short_name VARCHAR(25) NOT NULL,
  slug VARCHAR(50) NOT NULL UNIQUE,
  description TEXT,
  hod_name VARCHAR(120),
  established_year INT,
  contact_email VARCHAR(120),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  roll_number VARCHAR(30) UNIQUE NOT NULL,
  department_id INT,
  academic_year VARCHAR(20),
  semester VARCHAR(30),
  year_of_study INT,
  dob DATE,
  address TEXT,
  admission_status ENUM('admitted','pending','waitlisted') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS faculty (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  department_id INT,
  designation VARCHAR(100),
  qualification VARCHAR(200),
  experience_years INT,
  bio TEXT,
  photo_url VARCHAR(255),
  office_phone VARCHAR(30),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS leadership_profiles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  designation VARCHAR(120),
  bio TEXT,
  legacy TEXT,
  photo_url VARCHAR(255),
  category VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS admissions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  applicant_name VARCHAR(120) NOT NULL,
  email VARCHAR(120),
  phone VARCHAR(20),
  course VARCHAR(100),
  department_id INT,
  status ENUM('new','review','approved','rejected') DEFAULT 'new',
  form_data JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS fees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NOT NULL,
  department_id INT,
  tuition_fee DECIMAL(10,2) DEFAULT 0,
  hostel_fee DECIMAL(10,2) DEFAULT 0,
  mess_fee DECIMAL(10,2) DEFAULT 0,
  counselling_fee DECIMAL(10,2) DEFAULT 0,
  total_fee DECIMAL(10,2) DEFAULT 0,
  payment_status ENUM('paid','pending','partial') DEFAULT 'pending',
  due_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
  FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS attendance (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NOT NULL,
  subject_name VARCHAR(120) NOT NULL,
  total_classes INT DEFAULT 0,
  attended_classes INT DEFAULT 0,
  percentage DECIMAL(5,2) DEFAULT 0,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS assignments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NOT NULL,
  title VARCHAR(120) NOT NULL,
  subject_name VARCHAR(120),
  due_date DATE,
  description TEXT,
  file_url VARCHAR(255),
  status ENUM('pending','submitted','graded') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS timetables (
  id INT AUTO_INCREMENT PRIMARY KEY,
  department_id INT,
  semester VARCHAR(30),
  day_name VARCHAR(20),
  slot VARCHAR(50),
  subject_name VARCHAR(120),
  faculty_name VARCHAR(120),
  room_no VARCHAR(30),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS scholarships (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  description TEXT,
  eligibility TEXT,
  deadline DATE,
  application_link VARCHAR(255),
  amount DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  category VARCHAR(50),
  description TEXT,
  event_date DATE,
  venue VARCHAR(120),
  image_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS gallery_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category VARCHAR(50) NOT NULL,
  title VARCHAR(150) NOT NULL,
  image_url VARCHAR(255),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO departments (name, short_name, slug, description, hod_name, established_year, contact_email) VALUES
('Computer Science and Engineering', 'CSE', 'cse', 'Technology and software engineering excellence.', 'Dr. Anjali Menon', 2001, 'cse@shec.edu.in'),
('Computer Science and Engineering (AI & DS)', 'CSE-AI', 'cse-ai-ds', 'AI and data science-driven engineering education.', 'Dr. Raghav Iyer', 2020, 'cseai@shec.edu.in'),
('Electronics and Communication Engineering', 'ECE', 'ece', 'Applied electronics and communication systems.', 'Dr. Krishna Rao', 2003, 'ece@shec.edu.in'),
('Electrical and Electronics Engineering', 'EEE', 'eee', 'Power systems and modern electronics.', 'Dr. Nisha K', 2002, 'eee@shec.edu.in'),
('Mechanical Engineering', 'MECH', 'mechanical', 'Manufacturing and mechanical systems expertise.', 'Dr. Sandeep Nair', 2004, 'mech@shec.edu.in'),
('Civil Engineering', 'CIVIL', 'civil', 'Infrastructure design and construction development.', 'Dr. Deepa Mohan', 2005, 'civil@shec.edu.in');

INSERT INTO users (full_name, email, password_hash, role, phone) VALUES
('Student One', 'student1@shec.edu.in', '$2b$12$l5AselSdLf/wgCIKl3QFH.6.T5kbI7me3wjWw0ZrVoQIIJpDRm1tW', 'student', '9876543210'),
('Faculty One', 'faculty1@shec.edu.in', '$2b$12$UmsuRSz4kZNeM9rpCKr3KOHxDN8EjYNqGjO.WH4Z9rcJQN/XWZKhm', 'faculty', '9123456780'),
('Admin One', 'admin@shec.edu.in', '$2b$12$CDOwsxK0ANntIUPrP5JrSeMeDnVQL0vVNgJc89zvWlsvpGScnf4s6', 'admin', '9988776655');

INSERT INTO students (user_id, roll_number, department_id, academic_year, semester, year_of_study, dob, address, admission_status) VALUES
(1, 'CSE-2024-101', 1, '2024-2025', 'Semester 5', 3, '2003-06-15', 'Bengaluru, Karnataka', 'admitted');

INSERT INTO faculty (user_id, department_id, designation, qualification, experience_years, bio, photo_url, office_phone) VALUES
(2, 1, 'Assistant Professor', 'M.Tech, Ph.D. (Pursuing)', 8, 'Specializes in advanced algorithms and software architecture.', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e', '080-4000-1234');

INSERT INTO leadership_profiles (name, designation, bio, legacy, photo_url, category) VALUES
('Ravi Kumar', 'Chairman', 'Visionary education leader and founder of the SHEC legacy with a strong commitment to academic quality and student welfare.', 'History of Chairman Sir: Ravi Kumar built SHEC with values-driven leadership, strategic investment in campus infrastructure, and a long-term mission to create future-ready graduates and socially responsible citizens.', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d', 'chairman'),
('Harshith', 'Director', 'Guides institutional strategy, innovation, and academic excellence with a strong industry perspective.', 'The director has led SHEC through digital transformation, research partnerships, and disciplined growth in both academic and student-support initiatives.', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e', 'director'),
('Srinivasa Rao', 'Principal', 'Leads teaching quality, student affairs, and institutional development with a learner-centric philosophy.', 'The principal has fostered outcome-based learning, strong academic governance, and a culture of excellence across all departments.', 'https://images.unsplash.com/photo-1556157382-97eda2d62296', 'principal'),
('Sudheer Chakravarthy', 'Vice Principal', 'Supports academic operations, quality assurance, and faculty coordination across the campus ecosystem.', 'The vice principal works closely with departments on governance, student mentoring, and institutional accountability to improve academic outcomes.', 'https://images.unsplash.com/photo-1504593811423-6dd665756598', 'vice-principal'),
('Manikanta', 'Controller of Examinations (COE)', 'Oversees examination workflows, evaluation integrity, and transparent academic administration.', 'The COE introduced digitized exam processes and stronger transparency for result generation, fairness, and student communication.', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb', 'coe');

INSERT INTO admissions (applicant_name, email, phone, course, department_id, status, form_data) VALUES
('Aarav Sharma', 'aarav@example.com', '9876543210', 'B.Tech', 1, 'new', '{"source":"website"}');

INSERT INTO fees (student_id, department_id, tuition_fee, hostel_fee, mess_fee, counselling_fee, total_fee, payment_status, due_date) VALUES
(1, 1, 85000.00, 22000.00, 18000.00, 5000.00, 130000.00, 'pending', '2026-10-30');

INSERT INTO attendance (student_id, subject_name, total_classes, attended_classes, percentage) VALUES
(1, 'Data Structures', 40, 35, 87.5),
(1, 'Operating Systems', 35, 30, 85.7),
(1, 'Machine Learning', 38, 33, 86.8);

INSERT INTO assignments (student_id, title, subject_name, due_date, description, file_url, status) VALUES
(1, 'AI Mini Project', 'Machine Learning', '2026-10-05', 'Build a comparative model evaluation dashboard.', 'https://example.com/files/ai-project.pdf', 'pending'),
(1, 'DBMS Lab Submission', 'Database Systems', '2026-10-03', 'Create ER diagram and SQL schema for a library system.', 'https://example.com/files/dbms-lab.pdf', 'submitted'),
(1, 'Seminar Note Submission', 'Communication Skills', '2026-10-10', 'Prepare a seminar document on modern engineering communication.', 'https://example.com/files/seminar.pdf', 'graded');

INSERT INTO timetables (department_id, semester, day_name, slot, subject_name, faculty_name, room_no) VALUES
(1, 'Semester 5', 'Monday', '09:00-10:00', 'Data Structures', 'Dr. Anjali Menon', 'CSE-101'),
(1, 'Semester 5', 'Monday', '10:15-11:15', 'Operating Systems', 'Prof. Rakesh Kumar', 'CSE-203'),
(1, 'Semester 5', 'Tuesday', '11:30-12:30', 'Machine Learning', 'Dr. Kavya Nair', 'AI-Lab'),
(2, 'Semester 5', 'Wednesday', '09:00-10:00', 'Data Science Fundamentals', 'Dr. Kavya Nair', 'AI-201'),
(3, 'Semester 5', 'Thursday', '10:15-11:15', 'Digital Signal Processing', 'Dr. Krishna Rao', 'ECE-102');

INSERT INTO scholarships (name, description, eligibility, deadline, application_link, amount) VALUES
('Merit Excellence Scholarship', 'For top-performing students demonstrating academic excellence.', 'CGPA above 8.5 and no backlogs', '2026-11-30', 'https://example.com/scholarships/merit', 50000),
('EWS Support Grant', 'For economically weaker students in need of tuition support.', 'Family income below threshold', '2026-12-15', 'https://example.com/scholarships/ews', 25000),
('Sports Achievement Award', 'For athletes representing the college in national events.', 'State/national sports participation certificate', '2026-12-01', 'https://example.com/scholarships/sports', 30000);

INSERT INTO events (title, category, description, event_date, venue, image_url) VALUES
('Annual Tech Fest', 'technical', 'Innovation, coding and robotics showcase.', '2026-11-12', 'Main Auditorium', 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f'),
('Cultural Night', 'cultural', 'A vibrant stage event celebrating music and dance.', '2026-12-02', 'Open Air Stage', 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a'),
('Inter-College Sports Meet', 'sports', 'Athletics and team games across colleges.', '2026-10-20', 'College Ground', 'https://images.unsplash.com/photo-1547347298-4074fc3086f0');

INSERT INTO gallery_items (category, title, image_url, description) VALUES
('campus', 'Academic Block', 'https://images.unsplash.com/photo-1562771382-9e0d7d7f3e1e', 'Modern academic block with smart classrooms.'),
('hostel', 'Hostel Rooms', 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85', 'Comfortable student housing with safety features.'),
('library', 'Central Library', 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da', 'Resource-rich library for research and study.');
