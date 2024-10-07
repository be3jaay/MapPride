-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 26, 2024 at 01:29 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12


START TRANSACTION;
SET TIME ZONE '+00:00';


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mp_capstone_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `experiences`
--

CREATE TABLE experiences (
  id BIGSERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  experience_type VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  approved BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

--
-- Dumping data for table `experiences`
--

INSERT INTO experiences (id, username, title, experience_type, location, description, approved, created_at, updated_at) VALUES
(1, 'Adorn', 'Overcoming Harassment at Work', 'Harassment', 'Makati City, Philippines', 'Working in a corporate environment...', false, '2024-09-26 03:07:39', '2024-09-26 03:07:39'),
(2, 'John Doe', 'Bullying in School: Finding My Strength', 'Bullying', 'Cebu City, Philippines', 'During my high school years...', true, '2024-09-26 03:08:16', '2024-09-26 03:16:05');
-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE failed_jobs (
  id BIGSERIAL PRIMARY KEY,
  uuid VARCHAR(255) NOT NULL,
  connection TEXT NOT NULL,
  queue TEXT NOT NULL,
  payload TEXT NOT NULL,
  exception TEXT NOT NULL,
  failed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Table structure for table 'feedback'
CREATE TABLE feedback (
  id BIGSERIAL PRIMARY KEY,
  feedback_value INTEGER NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

--
-- Dumping data for table `feedback`
--

INSERT INTO feedback (id, feedback_value, description, created_at, updated_at) 
VALUES
(1, 5, 'The application was easy to use.', '2024-09-26 03:23:09', '2024-09-26 03:23:09');

-- --------------------------------------------------------

--
-- Table structure for table `hotlines`
--

CREATE TABLE hotlines (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  phoneNumber INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NULL,
  updated_at TIMESTAMP DEFAULT NULL
);

-- Dumping data for table hotlines
INSERT INTO hotlines (id, title, description, phoneNumber, created_at, updated_at) VALUES
(1, 'Support & Advocacy Hotline', 'The Support & Advocacy Hotline offers guidance and assistance for LGBTQ+ individuals seeking help with advocacy and support issues.', 912319283, '2024-09-26 03:14:28', '2024-09-26 03:14:28'),
(2, 'Youth Counseling Hotline', 'The Youth Counseling Hotline is a dedicated resource for LGBTQ+ youth seeking advice and support.', 912311885, '2024-09-26 03:14:48', '2024-09-26 03:14:48'),
(3, 'Mental Health Support Hotline', 'The Mental Health Support Hotline offers specialized help for LGBTQ+ individuals dealing with mental health issues.', 912155534, '2024-09-26 03:15:12', '2024-09-26 03:15:12');

-- Table structure for location_services
CREATE TABLE location_services (
  id BIGSERIAL PRIMARY KEY,
  marker_location_id BIGINT NOT NULL,
  service_name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NULL,
  updated_at TIMESTAMP DEFAULT NULL
);

-- Table structure for maps
CREATE TABLE maps (
  id BIGSERIAL PRIMARY KEY,
  location VARCHAR(255) NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  latitude DOUBLE PRECISION NOT NULL,
  image VARCHAR(255) DEFAULT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  address TEXT NOT NULL,
  phone INTEGER NOT NULL,
  services JSONB DEFAULT NULL,
  created_at TIMESTAMP DEFAULT NULL,
  updated_at TIMESTAMP DEFAULT NULL
);

-- Dumping data for table maps
INSERT INTO maps (id, location, longitude, latitude, image, title, description, address, phone, services, created_at, updated_at) VALUES
(1, 'Safe Spaces', 14.212700, 121.163900, 'images/AT17H2606f7yl265JTneQBHny3HlUJS4Y2RQADMP.jpg', 'Coffee Hub', 'Coffee Hub is an LGBTQ+-friendly coffee shop that provides a warm and inclusive environment for the community. It hosts weekly events and gatherings aimed at fostering connections and open discussions.', '456 Diversity Road, Los Baños, Laguna', 912211211, '"Open Mic Nights, Free Wi-Fi and Study Space"', '2024-09-26 02:31:28', '2024-09-26 02:31:28'),
(2, 'Government Services', 14.212700, 121.161100, 'images/2DD9ffSQHaPRBzmlp2ZAAhHPUfWgCpyOS2liY5dO.jpg', 'Safe Space: Rainbow Haven Community Center', 'Rainbow Haven is a welcoming and inclusive space dedicated to providing support, resources, and services to the LGBTQ+ community. It offers a safe environment for individuals to express themselves and access essential health, legal, and social services.', '123 Equality Street, Barangay Poblacion, Calamba, Laguna', 915439112, '"Counseling Services, Legal Assistance"', '2024-09-26 02:35:28', '2024-09-26 02:35:28'),
(3, 'Support Services', 14.212700, 121.167700, 'images/Iq4BUE1gX1RdwJRDVxGuDW0c7ABFec1mucteq9bz.jpg', 'Equality Health Clinic', 'A specialized healthcare facility in Makati City that provides comprehensive services for the LGBTQ+ community, including gender-affirming care, HIV testing and counseling, and mental health services. Equality Health Clinic is staffed by professionals trained in LGBTQ+ healthcare needs.', '45 Ayala Ave, Makati City, Metro Manila, Philippines', 915439112, '"Gender-affirming care, HIV testing and counseling"', '2024-09-26 02:37:33', '2024-09-26 02:37:33'),
(4, 'Healthcare Facilities', 14.212700, 121.170000, 'images/UcomhIs0fwFxfhvUYHEvwQ4UYm2S6bTtNfNq7DGm.jpg', 'Spectrum Health Clinic', 'Spectrum Health Clinic is a LGBTQ+-inclusive healthcare facility providing specialized services for the community, including hormone therapy and mental health counseling.', '789 Equality Avenue, San Pablo City, Laguna', 912211210, '"Hormone Replacement Therapy (HRT),  Mental Health Support"', '2024-09-26 02:39:00', '2024-09-26 02:39:00'),
(5, 'Safe Spaces', 14.212700, 121.158900, 'images/HprT6o05iUlM2w6EQGD876ynzQ1JpdrNgMdsIWQD.jpg', 'Laguna Pride Center', 'Laguna Pride Center is a community center that offers legal, health, and social services for LGBTQ+ individuals. It provides a safe and supportive environment for advocacy, education, and empowerment.', '123 Freedom Lane, Sta. Rosa, Laguna', 915439112, '"Support Groups, Community Outreach"', '2024-09-26 02:42:02', '2024-09-26 02:42:02');

-- Table structure for map_selections
CREATE TABLE map_selections (
  id BIGSERIAL PRIMARY KEY,
  location VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NULL,
  updated_at TIMESTAMP DEFAULT NULL
);

-- Dumping data for table map_selections
INSERT INTO map_selections (id, location, created_at, updated_at) VALUES
(1, 'Safe Spaces', '2024-09-26 02:17:04', '2024-09-26 02:17:04'),
(2, 'Government Services', '2024-09-26 02:17:15', '2024-09-26 02:17:15'),
(3, 'Healthcare Facilities', '2024-09-26 02:17:35', '2024-09-26 02:17:35'),
(4, 'Support Services', '2024-09-26 02:17:42', '2024-09-26 02:17:42');

-- Table structure for marker_location
CREATE TABLE marker_location (
  id BIGSERIAL PRIMARY KEY,
  location VARCHAR(255) NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  latitude DOUBLE PRECISION NOT NULL,
  location_image VARCHAR(255) DEFAULT NULL,
  location_title VARCHAR(255) NOT NULL,
  location_description TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NULL,
  updated_at TIMESTAMP DEFAULT NULL
);

-- Table structure for migrations
CREATE TABLE migrations (
  id SERIAL PRIMARY KEY,
  migration VARCHAR(255) NOT NULL,
  batch INTEGER NOT NULL
);

-- Dumping data for table migrations
INSERT INTO migrations (id, migration, batch) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2024_07_24_061812_create_experience_table', 1),
(6, '2024_07_25_052026_create_tabs', 1),
(7, '2024_07_26_043834_create_resources', 1),
(8, '2024_07_26_060411_create_trainings', 1),
(9, '2024_07_29_080848_create_tabs_training', 1),
(10, '2024_08_04_071726_create_support', 1),
(11, '2024_08_06_082251_create_hotline', 1),
(12, '2024_08_08_122250_create_map_selection_table', 1),
(13, '2024_08_09_102949_create_marker_location_table', 1),
(14, '2024_08_11_115025_create_maps_table', 1),
(15, '2024_09_13_064047_add_profile_picture_to_users_table', 1),
(16, '2024_09_26_100813_test_tables', 1),
(17, '2024_09_26_101639_map_selections', 2),
(18, '2024_09_26_105339_tabs_trainings', 3),
(20, '2024_09_26_105922_training_tabs', 4),
(21, '2024_09_26_111127_supports', 5),
(22, '2024_09_26_111411_hotlines', 6),
(23, '2024_09_26_111901_feedbacks', 7),
(24, '2024_09_26_112230_feedback', 8);

-- Table structure for password_reset_tokens
CREATE TABLE password_reset_tokens (
  email VARCHAR(255) PRIMARY KEY,
  token VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NULL
);
-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

-- Existing schema (from previous translation) ...

-- Table structure for personal_access_tokens
CREATE TABLE personal_access_tokens (
  id BIGSERIAL PRIMARY KEY,
  tokenable_type VARCHAR(255) NOT NULL,
  tokenable_id BIGINT NOT NULL,
  name VARCHAR(255) NOT NULL,
  token VARCHAR(64) NOT NULL,
  abilities TEXT DEFAULT NULL,
  last_used_at TIMESTAMP DEFAULT NULL,
  expires_at TIMESTAMP DEFAULT NULL,
  created_at TIMESTAMP DEFAULT NULL,
  updated_at TIMESTAMP DEFAULT NULL
);

-- Table structure for resources
CREATE TABLE resources (
  id BIGSERIAL PRIMARY KEY,
  tabs_title VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  url_link VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NULL,
  updated_at TIMESTAMP DEFAULT NULL
);

-- Dumping data for table resources
INSERT INTO resources (id, tabs_title, title, description, url_link, created_at, updated_at) VALUES
(1, 'Mental Health', 'Mental Well-being', 'LGBTQ+ individuals often face unique mental health challenges, including higher rates of anxiety, depression, and trauma due to discrimination and societal pressures. Access to inclusive mental health support, such as therapists trained in LGBTQ+ issues, peer support groups, and safe spaces, is crucial for fostering resilience and well-being. These resources help individuals navigate their experiences, build self-acceptance, and find community support.', 'https://www.researchgate.net/publication/378162359_Breaking_Barriers_Strategies_for_Fostering_Inclusivity_in_The_Workplace', '2024-09-26 03:05:30', '2024-09-26 03:05:30'),
(2, 'Legal Assistance', 'Legal Assistance', 'Legal resources are essential for LGBTQ+ individuals seeking to understand and protect their rights. This includes assistance with legal name and gender marker changes, protection against discrimination, and access to legal counsel for issues related to marriage, adoption, and employment. Ensuring legal support helps empower LGBTQ+ people to navigate the legal system with confidence and advocate for their rights.', 'https://www.researchgate.net/publication/378162359_Breaking_Barriers_Strategies_for_Fostering_Inclusivity_in_The_Workplace', '2024-09-26 03:06:10', '2024-09-26 03:06:10'),
(3, 'Education', 'Education & Awareness', 'Education and awareness are key to fostering understanding and inclusion for LGBTQ+ communities. Resources that provide information on LGBTQ+ history, issues, and rights are vital for promoting empathy and reducing stigma. Additionally, training programs for schools, workplaces, and organizations help create environments where LGBTQ+ individuals feel safe, respected, and valued.', 'https://www.researchgate.net/publication/378162359_Breaking_Barriers_Strategies_for_Fostering_Inclusivity_in_The_Workplace', '2024-09-26 03:06:36', '2024-09-26 03:06:36');

-- Table structure for supports
CREATE TABLE supports (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  phoneNumber INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NULL,
  updated_at TIMESTAMP DEFAULT NULL
);

-- Dumping data for table supports
INSERT INTO supports (id, title, description, phoneNumber, created_at, updated_at) VALUES
(1, 'LGBTQ+ Rights Desk', 'This dedicated desk at Quezon City Hall offers legal assistance and guidance on LGBTQ+ rights.', 912312311, '2024-09-26 03:11:49', '2024-09-26 03:15:44'),
(2, 'Inclusive Counseling Services', 'Inclusive Counseling Services offers specialized therapy and support for LGBTQ+ individuals.', 1234589551, '2024-09-26 03:12:32', '2024-09-26 03:12:32'),
(3, 'Anti-Discrimination Advocacy', 'Anti-Discrimination Advocacy focuses on supporting LGBTQ+ individuals who face discrimination or harassment.', 912122112, '2024-09-26 03:12:52', '2024-09-26 03:12:52');

-- Table structure for tabs
CREATE TABLE tabs (
  id BIGSERIAL PRIMARY KEY,
  tabs_type VARCHAR(255) NOT NULL,
  tabs_title VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NULL,
  updated_at TIMESTAMP DEFAULT NULL
);

-- Dumping data for table tabs
INSERT INTO tabs (id, tabs_type, tabs_title, created_at, updated_at) VALUES
(1, 'Resources', 'Mental Health', '2024-09-26 03:04:48', '2024-09-26 03:04:48'),
(2, 'Resources', 'Legal Assistance', '2024-09-26 03:05:46', '2024-09-26 03:05:46'),
(3, 'Resources', 'Education', '2024-09-26 03:06:22', '2024-09-26 03:06:22');

-- Table structure for trainings
CREATE TABLE trainings (
  id BIGSERIAL PRIMARY KEY,
  tabs_title VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  url_link VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NULL,
  updated_at TIMESTAMP DEFAULT NULL
);

-- Dumping data for table trainings
INSERT INTO trainings (id, tabs_title, title, description, url_link, created_at, updated_at) VALUES
(1, 'Leadership', 'Inclusive Leadership: Empowering LGBTQ+ Voices in the Workplace', 'This course is designed to develop leadership skills with a focus on inclusivity and diversity. Participants will learn strategies for fostering an inclusive work environment, advocating for LGBTQ+ rights within their organizations, and leading diverse teams with empathy and understanding. Through case studies, interactive workshops, and expert insights, you''ll gain the tools to become a transformative leader who empowers all voices.', 'https://www.researchgate.net/publication/378162359_Breaking_Barriers_Strategies_for_Fostering_Inclusivity_in_The_Workplace', '2024-09-26 03:04:06', '2024-09-26 03:04:06'),
(2, 'Entrepreneurship', 'LGBTQ+ Entrepreneurship: Building Inclusive Businesses', 'This course equips aspiring LGBTQ+ entrepreneurs with the knowledge and skills needed to start and grow a successful business. Learn about creating inclusive business models, securing funding, and building a brand that resonates with the LGBTQ+ community and allies. Through real-world examples and mentorship opportunities, you''ll gain the confidence to turn your ideas into thriving ventures that promote diversity and inclusion in the marketplace.', 'https://www.researchgate.net/publication/378162359_Breaking_Barriers_Strategies_for_Fostering_Inclusivity_in_The_Workplace', '2024-09-26 03:04:38', '2024-09-26 03:04:38');

-- Table structure for training_tabs
CREATE TABLE training_tabs (
  id BIGSERIAL PRIMARY KEY,
  tabs_type VARCHAR(255) NOT NULL,
  tabs_title VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NULL,
  updated_at TIMESTAMP DEFAULT NULL
);

-- Dumping data for table training_tabs
INSERT INTO training_tabs (id, tabs_type, tabs_title, created_at, updated_at) VALUES
(1, 'Training', 'LGBTQ+ Basics', '2024-09-26 03:01:51', '2024-09-26 03:01:51'),
(2, 'Training', 'Mental Health', '2024-09-26 03:02:07', '2024-09-26 03:02:07'),
(3, 'Training', 'Inclusive Education', '2024-09-26 03:02:27', '2024-09-26 03:02:27'),
(4, 'Training', 'Workplace', '2024-09-26 03:02:32', '2024-09-26 03:02:32'),
(5, 'Training', 'Leadership', '2024-09-26 03:03:24', '2024-09-26 03:03:24'),
(6, 'Training', 'Entrepreneurship', '2024-09-26 03:04:20', '2024-09-26 03:04:20');

-- Table structure for users
CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  preferences VARCHAR(255) NOT NULL,
  gender VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  profile_picture VARCHAR(255) DEFAULT NULL,
  image VARCHAR(255) DEFAULT NULL,
  usertype VARCHAR(255) NOT NULL DEFAULT 'user',
  email_verified_at TIMESTAMP DEFAULT NULL,
  password VARCHAR(255) NOT NULL,
  remember_token VARCHAR(100) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT NULL,
  updated_at TIMESTAMP DEFAULT NULL
);

-- Dumping data for table users
INSERT INTO users (id, name, preferences, gender, email, profile_picture, image, usertype, email_verified_at, password, remember_token, created_at, updated_at) VALUES
(1, 'Admin', 'bisexual', 'Bisexual', 'admin@gmail.com', 'profile-pictures/gGxJhWMuKorOHyB5bNSYbj6YHvONT39hiqL8lcgA.jpg', NULL, 'admin', NULL, '$2y$12$CBccbc1Cc1q4oGVkiTUMEOSxieHpLQBDuSoy2zJIvkH3m9FaBEuIu', NULL, '2024-09-26 02:12:34', '2024-09-26 02:33:04'),
(2, 'User', 'Male', 'Male', 'user@gmail.com', NULL, NULL, 'user', NULL, '$2y$12$iGxCgqynyBgAxw0Qi7aNRewqKQgle1r0Z3hyISDNNn5p.f8J8YTXG', NULL, '2024-09-26 02:13:39', '2024-09-26 02:13:39');

-- Add indexes
CREATE INDEX idx_personal_access_tokens_tokenable ON personal_access_tokens (tokenable_type, tokenable_id);
CREATE UNIQUE INDEX idx_personal_access_tokens_token ON personal_access_tokens (token);

CREATE INDEX idx_users_email ON users (email);

--
-- Indexes for table `location_services`
--
ALTER TABLE users ALTER COLUMN id SET DEFAULT nextval('users_id_seq');
--
-- Constraints for dumped tables
--

--
-- Constraints for table `location_services`
--
ALTER TABLE location_services
  ADD CONSTRAINT location_services_marker_location_id_foreign
  FOREIGN KEY (marker_location_id) 
  REFERENCES marker_location (id) 
  ON DELETE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
