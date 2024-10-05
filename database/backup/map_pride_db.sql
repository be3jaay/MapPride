-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 05, 2024 at 04:19 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mp_capstone_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `blogs`
--

CREATE TABLE `blogs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `username` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `blogs`
--

INSERT INTO `blogs` (`id`, `username`, `title`, `description`, `image`, `icon`, `created_at`, `updated_at`) VALUES
(1, 'Admin', 'test', 'test', 'images/S0jIB7AK5IuuFih8JLjUENxOEp48XMu5ehmoz7xm.jpg', 'icons/8bDIE3odm6a0N1bbyedlJaGWUzXtyOjd7YIJQfCM.jpg', '2024-09-30 00:48:17', '2024-09-30 00:48:17'),
(2, 'Admin', 'est', 'asdasd', 'images/nUuzMY5U3E2hbZduQl35JKQyQDTRFu4Y0FHGn2dx.jpg', 'icons/Yfl1rVC53nRHbg7rck9LTtDWr8eWNfFMoxKf0Xax.jpg', '2024-09-30 00:48:40', '2024-09-30 00:48:40'),
(3, 'Admin', 'test', 'sdads', 'images/LLmCAe8MK0E0T1x2TbRn6gzUzrhEqIe2MCwigI1m.jpg', 'profile-pictures/gGxJhWMuKorOHyB5bNSYbj6YHvONT39hiqL8lcgA.jpg', '2024-09-30 00:51:45', '2024-09-30 00:51:45'),
(4, 'Test', '@SM Calamba', 'Just got here...', 'images/U0aAl1aKfyrv1l3vCzwmgfU7stmUtZb7kufQc2Wf.jpg', 'profile-pictures/0pupn2nobIVzmrvUOLAlVOzX07iYzcknManR33G1.jpg', '2024-10-01 01:48:52', '2024-10-01 01:48:52'),
(7, 'Admin', 'test', 'test', NULL, 'profile-pictures/gGxJhWMuKorOHyB5bNSYbj6YHvONT39hiqL8lcgA.jpg', '2024-10-03 03:30:11', '2024-10-03 03:30:11'),
(8, 'Admin', 'test', 'test', 'images/eFNvpUQmgrvzn9pgwnfPf6stp6OdAi24Nf2O4ocf.png', 'profile-pictures/gGxJhWMuKorOHyB5bNSYbj6YHvONT39hiqL8lcgA.jpg', '2024-10-03 05:16:12', '2024-10-03 05:16:12'),
(9, 'User', 'TEST', 'test', NULL, 'profile-pictures/GvF6ZyIFD8Xp4hn6ya0HNDBEVEZrGZ6mSLWEObm3.jpg', '2024-10-04 02:13:35', '2024-10-04 02:13:35'),
(10, 'Admin', 'asdasd', 'asdasd', NULL, 'profile-pictures/gGxJhWMuKorOHyB5bNSYbj6YHvONT39hiqL8lcgA.jpg', '2024-10-04 04:00:18', '2024-10-04 04:00:18'),
(11, 'Admin', 'asdads', 'asdasd', NULL, 'profile-pictures/gGxJhWMuKorOHyB5bNSYbj6YHvONT39hiqL8lcgA.jpg', '2024-10-04 04:03:32', '2024-10-04 04:03:32');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `blog_id` bigint(20) UNSIGNED NOT NULL,
  `username` varchar(255) NOT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `blog_id`, `username`, `icon`, `content`, `created_at`, `updated_at`) VALUES
(1, 3, 'Admin', NULL, 'profile-pictures/gGxJhWMuKorOHyB5bNSYbj6YHvONT39hiqL8lcgA.jpg', '2024-09-30 02:15:17', '2024-09-30 02:15:17'),
(2, 3, 'Admin', NULL, 'profile-pictures/gGxJhWMuKorOHyB5bNSYbj6YHvONT39hiqL8lcgA.jpg', '2024-09-30 02:15:37', '2024-09-30 02:15:37'),
(3, 3, 'Admin', 'profile-pictures/gGxJhWMuKorOHyB5bNSYbj6YHvONT39hiqL8lcgA.jpg', 'asda', '2024-09-30 02:18:15', '2024-09-30 02:18:15'),
(4, 3, 'User', 'profile-pictures/GvF6ZyIFD8Xp4hn6ya0HNDBEVEZrGZ6mSLWEObm3.jpg', 'Nice Coffee', '2024-09-30 02:25:14', '2024-09-30 02:25:14'),
(5, 4, 'User', 'profile-pictures/GvF6ZyIFD8Xp4hn6ya0HNDBEVEZrGZ6mSLWEObm3.jpg', 'Bacon ipsum dolor amet turducken kielbasa turkey shoulder landjaeger swine short ribs prosciutto chuck tail salami picanha boudin. Buffalo beef frankfurter tongue short loin turkey andouille pork loin prosciutto burgdoggen shankle biltong. Brisket chicken salami biltong ham. Porchetta short ribs frankfurter leberkas pastrami. Cow tri-tip corned beef short loin leberkas drumstick filet mignon. Filet mignon corned beef pork chop rump frankfurter, turducken burgdoggen bresaola pastrami pork belly spare ribs leberkas kielbasa beef. Ham hock shank filet mignon, venison buffalo bresaola capicola fatback alcatra pastrami ground round burgdoggen jowl.\n\nSpare ribs sirloin kevin alcatra, meatball pork belly meatloaf beef ribs turducken filet mignon t-bone ground round jowl chislic porchetta. Picanha boudin pork chop tri-tip pastrami prosciutto landjaeger alcatra strip steak kevin shoulder turkey short loin. Kielbasa filet mignon biltong, pork buffalo landjaeger salami alcatra corned beef tongue shoulder ribeye. Corned beef salami turducken chuck ham hock pork loin beef ribs burgdoggen swine fatback filet mignon spare ribs. Pastrami jowl drumstick t-bone tenderloin pig porchetta fatback cupim brisket pork belly biltong pork beef. Jerky chislic kielbasa alcatra, andouille biltong ham pastrami landjaeger spare ribs pork belly tongue boudin shank. Chislic corned beef shankle ribeye pork loin.', '2024-10-01 01:49:38', '2024-10-01 01:49:38'),
(6, 4, 'User', 'profile-pictures/GvF6ZyIFD8Xp4hn6ya0HNDBEVEZrGZ6mSLWEObm3.jpg', 'asdasdasdasdadsasddsad', '2024-10-01 01:55:34', '2024-10-01 01:55:34'),
(7, 4, 'Admin', 'profile-pictures/gGxJhWMuKorOHyB5bNSYbj6YHvONT39hiqL8lcgA.jpg', 'HELLO', '2024-10-01 04:03:06', '2024-10-01 04:03:06'),
(8, 9, 'User', 'profile-pictures/GvF6ZyIFD8Xp4hn6ya0HNDBEVEZrGZ6mSLWEObm3.jpg', 'TEST', '2024-10-04 02:16:09', '2024-10-04 02:16:09'),
(9, 9, 'User', 'profile-pictures/GvF6ZyIFD8Xp4hn6ya0HNDBEVEZrGZ6mSLWEObm3.jpg', 'ttes', '2024-10-04 02:16:56', '2024-10-04 02:16:56'),
(10, 9, 'User', 'profile-pictures/GvF6ZyIFD8Xp4hn6ya0HNDBEVEZrGZ6mSLWEObm3.jpg', 'test', '2024-10-04 02:17:00', '2024-10-04 02:17:00'),
(16, 8, 'Admin', 'profile-pictures/gGxJhWMuKorOHyB5bNSYbj6YHvONT39hiqL8lcgA.jpg', 'asd', '2024-10-04 04:02:09', '2024-10-04 04:02:09'),
(23, 9, 'Admin', 'profile-pictures/gGxJhWMuKorOHyB5bNSYbj6YHvONT39hiqL8lcgA.jpg', 'asdasdsdasdsd', '2024-10-04 04:04:45', '2024-10-04 04:04:45'),
(27, 11, 'Admin', 'profile-pictures/gGxJhWMuKorOHyB5bNSYbj6YHvONT39hiqL8lcgA.jpg', 'asdadsasd', '2024-10-04 04:06:36', '2024-10-04 04:06:36');

-- --------------------------------------------------------

--
-- Table structure for table `experiences`
--

CREATE TABLE `experiences` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `username` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `experience_type` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `approved` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `experiences`
--

INSERT INTO `experiences` (`id`, `username`, `title`, `experience_type`, `location`, `description`, `approved`, `created_at`, `updated_at`) VALUES
(1, 'Adorn', 'Overcoming Harassment at Work', 'Harassment', 'Makati City, Philippines', 'Working in a corporate environment in Makati City, I always feared being my true self. My colleagues would make subtle yet hurtful remarks about my gender identity, often misgendering me or making me the subject of inappropriate jokes. It felt like I was constantly walking on eggshells, unable to speak up out of fear of losing my job. But one day, I decided enough was enough. I reported the harassment to HR and sought support from LGBTQ+ advocacy groups. The process was tough, but standing up for myself led to a much-needed conversation in the office about inclusivity and respect. Now, I’m more confident, and I hope my experience inspires others to speak out against workplace harassment.', 1, '2024-09-26 03:07:39', '2024-10-01 01:04:00'),
(2, 'John Doe', 'Bullying in School: Finding My Strength', 'Bullying', 'Cebu City, Philippines', 'During my high school years in Cebu City, I was frequently bullied for being openly gay. My classmates would call me names, exclude me from group activities, and even spread false rumors about me. It was a lonely and painful experience that made me dread going to school every day. However, instead of letting the bullying break me, I found strength in joining an LGBTQ+ youth group. There, I met friends who understood me, and together, we launched a campaign to promote acceptance and fight against bullying in our school. With time, I learned to stand up for myself and others, and I’m proud to say that our efforts led to the implementation of anti-bullying policies in our school.', 1, '2024-09-26 03:08:16', '2024-09-26 03:16:05'),
(9, 'test', 'test', 'Harassment', 'test', 'test', 0, '2024-10-03 19:38:46', '2024-10-03 19:38:46'),
(10, 'test', 'test', 'test', 'test', 'test', 0, '2024-10-03 19:44:12', '2024-10-03 19:44:12'),
(11, 'test', 'test', 'Discrimination', 'test', 'test', 0, '2024-10-03 19:44:54', '2024-10-03 19:44:54'),
(12, 'test', 'test', 'Harassment', 'Cavinti', 'test', 0, '2024-10-03 22:58:35', '2024-10-03 22:58:35'),
(13, 'test', 'test', 'Discrimination', 'Majayjay', 'aa', 0, '2024-10-03 23:03:00', '2024-10-03 23:03:00'),
(14, 'test', 'test', 'Bullying', 'Calamba City', 'asdasd', 0, '2024-10-04 03:59:57', '2024-10-04 03:59:57');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `feedback_value` int(11) NOT NULL,
  `description` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `feedback`
--

INSERT INTO `feedback` (`id`, `feedback_value`, `description`, `created_at`, `updated_at`) VALUES
(1, 5, 'The application was easy to use.', '2024-09-26 03:23:09', '2024-09-26 03:23:09'),
(2, 4, 'Nice Application', '2024-09-27 20:53:44', '2024-09-27 20:53:44'),
(4, 5, 'test', '2024-09-27 20:59:25', '2024-09-27 20:59:25'),
(5, 5, 'test', '2024-10-04 00:54:41', '2024-10-04 00:54:41'),
(6, 5, 'test', '2024-10-04 00:55:00', '2024-10-04 00:55:00');

-- --------------------------------------------------------

--
-- Table structure for table `hotlines`
--

CREATE TABLE `hotlines` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `phoneNumber` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `hotlines`
--

INSERT INTO `hotlines` (`id`, `title`, `description`, `phoneNumber`, `created_at`, `updated_at`) VALUES
(1, 'Support & Advocacy Hotline', 'The Support & Advocacy Hotline offers guidance and assistance for LGBTQ+ individuals seeking help with advocacy and support issues.', 912319283, '2024-09-26 03:14:28', '2024-09-26 03:14:28'),
(2, 'Youth Counseling Hotline', 'The Youth Counseling Hotline is a dedicated resource for LGBTQ+ youth seeking advice and support.', 912311885, '2024-09-26 03:14:48', '2024-09-26 03:14:48'),
(4, 'Mental Health Support Hotline', 'The Mental Health Support Hotline offers specialized help for LGBTQ+ individuals dealing with mental health issues.', 912155532, '2024-09-30 18:52:46', '2024-10-03 18:57:11');

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE `likes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `map_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `location_services`
--

CREATE TABLE `location_services` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `marker_location_id` bigint(20) UNSIGNED NOT NULL,
  `service_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `maps`
--

CREATE TABLE `maps` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `location` varchar(255) NOT NULL,
  `longitude` double(10,6) NOT NULL,
  `latitude` double(10,6) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `address` text NOT NULL,
  `phone` int(11) NOT NULL,
  `services` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`services`)),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `maps`
--

INSERT INTO `maps` (`id`, `location`, `longitude`, `latitude`, `image`, `title`, `description`, `address`, `phone`, `services`, `created_at`, `updated_at`) VALUES
(1, 'Safe Spaces', 14.212700, 121.163900, 'images/AT17H2606f7yl265JTneQBHny3HlUJS4Y2RQADMP.jpg', 'Coffee Hub', 'Coffee Hub is an LGBTQ+-friendly coffee shop that provides a warm and inclusive environment for the community. It hosts weekly events and gatherings aimed at fostering connections and open discussions.', '456 Diversity Road, Los Baños, Laguna', 912211211, '\"Open Mic Nights, Free Wi-Fi and Study Space\"', '2024-09-26 02:31:28', '2024-09-26 02:31:28'),
(2, 'Government Services', 14.212700, 121.161100, 'images/2DD9ffSQHaPRBzmlp2ZAAhHPUfWgCpyOS2liY5dO.jpg', 'Safe Space: Rainbow Haven Community Center', 'Rainbow Haven is a welcoming and inclusive space dedicated to providing support, resources, and services to the LGBTQ+ community. It offers a safe environment for individuals to express themselves and access essential health, legal, and social services.', '123 Equality Street, Barangay Poblacion, Calamba, Laguna', 915439112, '\"Counseling Services, Legal Assistance\"', '2024-09-26 02:35:28', '2024-09-26 02:35:28'),
(3, 'Support Services', 14.212700, 121.167700, 'images/Iq4BUE1gX1RdwJRDVxGuDW0c7ABFec1mucteq9bz.jpg', 'Equality Health Clinic', 'A specialized healthcare facility in Makati City that provides comprehensive services for the LGBTQ+ community, including gender-affirming care, HIV testing and counseling, and mental health services. Equality Health Clinic is staffed by professionals trained in LGBTQ+ healthcare needs.', '45 Ayala Ave, Makati City, Metro Manila, Philippines', 915439112, '\"Gender-affirming care, HIV testing and counseling\"', '2024-09-26 02:37:33', '2024-09-26 02:37:33'),
(4, 'Healthcare Facilities', 14.212700, 121.170000, 'images/UcomhIs0fwFxfhvUYHEvwQ4UYm2S6bTtNfNq7DGm.jpg', 'Spectrum Health Clinic', 'Spectrum Health Clinic is a LGBTQ+-inclusive healthcare facility providing specialized services for the community, including hormone therapy and mental health counseling.', '789 Equality Avenue, San Pablo City, Laguna', 912211210, '\"Hormone Replacement Therapy (HRT),  Mental Health Support\"', '2024-09-26 02:39:00', '2024-09-26 02:39:00'),
(5, 'Safe Spaces', 14.212700, 121.158900, 'images/HprT6o05iUlM2w6EQGD876ynzQ1JpdrNgMdsIWQD.jpg', 'Laguna Pride Center', 'Laguna Pride Center is a community center that offers legal, health, and social services for LGBTQ+ individuals. It provides a safe and supportive environment for advocacy, education, and empowerment.', '123 Freedom Lane, Sta. Rosa, Laguna', 915439112, '\"Support Groups, Community Outreach\"', '2024-09-26 02:42:02', '2024-09-26 02:42:02');

-- --------------------------------------------------------

--
-- Table structure for table `map_selections`
--

CREATE TABLE `map_selections` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `location` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `map_selections`
--

INSERT INTO `map_selections` (`id`, `location`, `created_at`, `updated_at`) VALUES
(1, 'Safe Spaces', '2024-09-26 02:17:04', '2024-09-26 02:17:04'),
(2, 'Government Services', '2024-09-26 02:17:15', '2024-09-26 02:17:15'),
(3, 'Healthcare Facilities', '2024-09-26 02:17:35', '2024-09-26 02:17:35'),
(4, 'Support Services', '2024-09-26 02:17:42', '2024-09-26 02:17:42');

-- --------------------------------------------------------

--
-- Table structure for table `marker_location`
--

CREATE TABLE `marker_location` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `location` varchar(255) NOT NULL,
  `longitude` double(10,6) NOT NULL,
  `latitude` double(10,6) NOT NULL,
  `location_image` varchar(255) DEFAULT NULL,
  `location_title` varchar(255) NOT NULL,
  `location_description` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2024_07_24_061812_create_experience_table', 1),
(6, '2024_07_25_052026_create_tabs', 1),
(7, '2024_07_26_043834_create_resources', 1),
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
(24, '2024_09_26_112230_feedback', 8),
(25, '2024_09_28_052656_create_likes_table', 9),
(27, '2024_09_30_073401_create_blogs_table', 10),
(30, '2024_09_30_090524_create_comments_table', 11),
(31, '2024_09_30_110235_create_ratings_table', 12),
(32, '2024_07_26_060411_create_trainings', 13);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ratings`
--

CREATE TABLE `ratings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `map_id` bigint(20) UNSIGNED NOT NULL,
  `rating_value` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ratings`
--

INSERT INTO `ratings` (`id`, `map_id`, `rating_value`, `created_at`, `updated_at`) VALUES
(1, 5, 5, '2024-09-30 04:29:52', '2024-09-30 04:29:52'),
(2, 5, 4, '2024-09-30 04:37:27', '2024-09-30 04:37:27'),
(3, 2, 5, '2024-09-30 04:37:48', '2024-09-30 04:37:48'),
(4, 2, 5, '2024-09-30 17:35:12', '2024-09-30 17:35:12'),
(5, 2, 4, '2024-09-30 17:35:23', '2024-09-30 17:35:23'),
(6, 2, 5, '2024-09-30 17:35:29', '2024-09-30 17:35:29'),
(7, 3, 5, '2024-10-01 01:58:11', '2024-10-01 01:58:11'),
(8, 3, 4, '2024-10-01 01:59:08', '2024-10-01 01:59:08'),
(9, 3, 4, '2024-10-01 02:01:20', '2024-10-01 02:01:20'),
(10, 2, 5, '2024-10-01 02:03:04', '2024-10-01 02:03:04'),
(11, 2, 5, '2024-10-01 02:03:37', '2024-10-01 02:03:37'),
(12, 2, 5, '2024-10-01 02:03:56', '2024-10-01 02:03:56'),
(13, 2, 5, '2024-10-01 02:04:47', '2024-10-01 02:04:47'),
(14, 2, 5, '2024-10-01 02:05:38', '2024-10-01 02:05:38'),
(15, 4, 4, '2024-10-01 02:06:07', '2024-10-01 02:06:07'),
(16, 4, 5, '2024-10-01 02:06:50', '2024-10-01 02:06:50'),
(17, 4, 4, '2024-10-01 02:08:30', '2024-10-01 02:08:30'),
(18, 4, 4, '2024-10-01 02:10:28', '2024-10-01 02:10:28'),
(19, 4, 4, '2024-10-01 02:11:35', '2024-10-01 02:11:35'),
(20, 4, 4, '2024-10-01 03:40:26', '2024-10-01 03:40:26'),
(21, 4, 4, '2024-10-01 03:40:44', '2024-10-01 03:40:44'),
(22, 4, 4, '2024-10-01 03:40:56', '2024-10-01 03:40:56'),
(23, 4, 4, '2024-10-01 03:41:08', '2024-10-01 03:41:08'),
(24, 4, 4, '2024-10-01 03:41:24', '2024-10-01 03:41:24'),
(25, 4, 4, '2024-10-01 03:41:53', '2024-10-01 03:41:53'),
(26, 4, 5, '2024-10-01 03:42:53', '2024-10-01 03:42:53'),
(27, 4, 5, '2024-10-01 03:43:53', '2024-10-01 03:43:53'),
(28, 1, 5, '2024-10-01 06:41:57', '2024-10-01 06:41:57'),
(29, 1, 4, '2024-10-01 06:42:01', '2024-10-01 06:42:01'),
(30, 1, 4, '2024-10-01 06:42:04', '2024-10-01 06:42:04'),
(31, 4, 5, '2024-10-02 01:32:24', '2024-10-02 01:32:24'),
(32, 5, 4, '2024-10-03 23:05:57', '2024-10-03 23:05:57'),
(33, 5, 4, '2024-10-03 23:06:06', '2024-10-03 23:06:06'),
(34, 4, 5, '2024-10-03 23:08:37', '2024-10-03 23:08:37'),
(35, 4, 4, '2024-10-03 23:09:03', '2024-10-03 23:09:03'),
(36, 4, 5, '2024-10-03 23:12:08', '2024-10-03 23:12:08'),
(37, 4, 5, '2024-10-03 23:13:29', '2024-10-03 23:13:29'),
(38, 4, 5, '2024-10-03 23:14:41', '2024-10-03 23:14:41'),
(39, 4, 5, '2024-10-03 23:15:10', '2024-10-03 23:15:10'),
(40, 3, 4, '2024-10-03 23:18:15', '2024-10-03 23:18:15'),
(41, 1, 4, '2024-10-03 23:25:35', '2024-10-03 23:25:35'),
(42, 4, 5, '2024-10-03 23:28:08', '2024-10-03 23:28:08'),
(43, 4, 5, '2024-10-03 23:28:25', '2024-10-03 23:28:25'),
(44, 4, 5, '2024-10-03 23:29:07', '2024-10-03 23:29:07'),
(45, 4, 5, '2024-10-03 23:30:23', '2024-10-03 23:30:23'),
(46, 4, 5, '2024-10-03 23:30:23', '2024-10-03 23:30:23'),
(47, 3, 5, '2024-10-03 23:31:11', '2024-10-03 23:31:11'),
(48, 4, 5, '2024-10-03 23:34:43', '2024-10-03 23:34:43'),
(49, 2, 5, '2024-10-04 02:10:04', '2024-10-04 02:10:04'),
(50, 4, 4, '2024-10-04 02:10:25', '2024-10-04 02:10:25'),
(51, 4, 4, '2024-10-04 02:10:35', '2024-10-04 02:10:35'),
(52, 4, 5, '2024-10-04 04:00:05', '2024-10-04 04:00:05');

-- --------------------------------------------------------

--
-- Table structure for table `resources`
--

CREATE TABLE `resources` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tabs_title` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `url_link` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `resources`
--

INSERT INTO `resources` (`id`, `tabs_title`, `title`, `description`, `url_link`, `created_at`, `updated_at`) VALUES
(1, 'Mental Health', 'Mental Well-being', 'LGBTQ+ individuals often face unique mental health challenges, including higher rates of anxiety, depression, and trauma due to discrimination and societal pressures. Access to inclusive mental health support, such as therapists trained in LGBTQ+ issues, peer support groups, and safe spaces, is crucial for fostering resilience and well-being. These resources help individuals navigate their experiences, build self-acceptance, and find community support.', 'https://www.researchgate.net/publication/378162359_Breaking_Barriers_Strategies_for_Fostering_Inclusivity_in_The_Workplace', '2024-09-26 03:05:30', '2024-09-26 03:05:30'),
(2, 'Legal Assistance', 'Legal Assistance', 'Legal resources are essential for LGBTQ+ individuals seeking to understand and protect their rights. This includes assistance with legal name and gender marker changes, protection against discrimination, and access to legal counsel for issues related to marriage, adoption, and employment. Ensuring legal support helps empower LGBTQ+ people to navigate the legal system with confidence and advocate for their rights.', 'https://www.researchgate.net/publication/378162359_Breaking_Barriers_Strategies_for_Fostering_Inclusivity_in_The_Workplace', '2024-09-26 03:06:10', '2024-10-03 19:19:35');

-- --------------------------------------------------------

--
-- Table structure for table `supports`
--

CREATE TABLE `supports` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `phoneNumber` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `supports`
--

INSERT INTO `supports` (`id`, `title`, `description`, `phoneNumber`, `created_at`, `updated_at`) VALUES
(1, 'LGBTQ+ Rights Desk', 'This dedicated desk at Quezon City Hall offers legal assistance and guidance on LGBTQ+ rights.', 912312311, '2024-09-26 03:11:49', '2024-09-26 03:15:44'),
(2, 'Inclusive Counseling Services', 'Inclusive Counseling Services offers specialized therapy and support for LGBTQ+ individuals.', 123458951, '2024-09-26 03:12:32', '2024-09-30 19:00:30'),
(3, 'Anti-Discrimination Advocacy', 'Anti-Discrimination Advocacy focuses on supporting LGBTQ+ individuals who face discrimination or harassment.', 912122113, '2024-09-26 03:12:52', '2024-10-03 19:13:23');

-- --------------------------------------------------------

--
-- Table structure for table `tabs`
--

CREATE TABLE `tabs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tabs_type` varchar(255) NOT NULL,
  `tabs_title` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tabs`
--

INSERT INTO `tabs` (`id`, `tabs_type`, `tabs_title`, `created_at`, `updated_at`) VALUES
(1, 'Resources', 'Mental Health', '2024-09-26 03:04:48', '2024-09-26 03:04:48'),
(2, 'Resources', 'Legal Assistance', '2024-09-26 03:05:46', '2024-09-26 03:05:46'),
(3, 'Resources', 'Education', '2024-09-26 03:06:22', '2024-09-26 03:06:22');

-- --------------------------------------------------------

--
-- Table structure for table `trainings`
--

CREATE TABLE `trainings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tabs_title` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `url_link` varchar(255) NOT NULL,
  `credits` varchar(255) NOT NULL,
  `certificate` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `trainings`
--

INSERT INTO `trainings` (`id`, `tabs_title`, `title`, `description`, `url_link`, `credits`, `certificate`, `created_at`, `updated_at`) VALUES
(2, 'Business', 'Business Analytics with Excel: Elementary to Advanced', 'A leader in a data driven world requires the knowledge of both data-related (statistical) methods and of appropriate models to use that data. This Business Analytics class focuses on the latter: it introduces students to analytical frameworks used for decision making though Excel modeling. These include Linear and Integer Optimization, Decision Analysis, and Risk modeling. For each methodology students are first exposed to the basic mechanics, and then apply the methodology to real-world business problems using Excel.', 'https://www.coursera.org/learn/business-analytics-excel', 'Coursera', 1, '2024-10-02 23:22:53', '2024-10-02 23:22:53'),
(3, 'Business', 'Financial Market', 'An overview of the ideas, methods, and institutions that permit human society to manage risks and foster enterprise.  Emphasis on financially-savvy leadership skills. Description of practices today and analysis of prospects for the future. Introduction to risk management and behavioral finance principles to understand the real-world functioning of securities, insurance, and banking industries.  The ultimate goal of this course is using such industries effectively and towards a better society.', 'https://www.coursera.org/learn/financial-markets-global', 'Coursera', 1, '2024-10-02 23:23:50', '2024-10-02 23:23:50'),
(6, 'Business', 'How to Start a Startup / Business', 'Have you spent hours, days, months or even years sitting around dreaming about starting your own business? Why haven\'t you started? Do you think it\'s too hard to get started? Don\'t know where to start? \n\nIf so, then this course is for you. \"How to Start a Startup / Business\" is designed for anyone to understand the basics of what it takes to start a business. By the end of this short course you will be able to get your startup up and running!', 'https://www.udemy.com/course/how-to-start-a-startup-business/', 'Udemy', 0, '2024-10-03 00:18:24', '2024-10-03 00:18:24'),
(7, 'Business', 'The Foundations of Entrepreneurship - Full Course', 'This entrepreneurship course will teach you the important lessons that they don\'t teach you in business school. You will learn about topics such as how to network, how to find customers, and how to get a job.', 'https://www.youtube.com/watch?v=UEngvxZ11sw', 'freeCodeCamp', 0, '2024-10-03 00:38:02', '2024-10-03 00:38:02'),
(8, 'Leadership', 'International Leadership and Organizational Behavior', 'Leaders in business and non-profit organizations increasingly work across national borders and in multi-cultural environments. You may work regularly with customers or suppliers abroad, or be part of a globally dispersed cross-functional team, or an expatriate manager on an international assignment. You may be a member of a global online community, or a development aid worker collaborating with an international network of partner organizations. In all of these contexts, your effectiveness as a leader depends on how well you understand and are able to manage individual and collective behaviors in an intercultural context. \n\nIn this course – together with a team of Bocconi expert faculty and Bocconi alumni – we’ll explore the theory and practice of international and intercultural leadership and organizational behavior. Social science research has revealed systematic ways in which our behavior differs across cultural contexts – enabling us to more effectively work across borders.', 'https://www.coursera.org/learn/organizational-behavior', 'Coursera', 0, '2024-10-03 00:39:37', '2024-10-03 00:41:40'),
(9, 'Leadership', 'Connected Leadership', 'This course is designed to maximize your ability to create change at the individual, team and system levels. Through study, reflection, and deploying practical tools, you will establish a firm connection between your clearly articulated Purpose, effective Priorities, visualized Potential for success, and pathway to maximized Progress. But, what does that mean in practice? \n\nWhen you take this course, you will: \n\n- Improve your ability to get the most out of life: Learn a simple practice to reflect on your purpose, clarify priorities, visualize your potential, and maximize your effectiveness at progressing towards your goals.\n\n- Strengthen your leadership toolkit: Tap into your unique leadership style and strengths and join or create a community of others to maximize your potential as a team.\n\n- Create change through systems thinking: Become a more effective agent of positive change and appreciate the power and complexity of system thinking.', 'https://www.coursera.org/learn/connected-leadership', 'Coursera', 0, '2024-10-03 00:46:34', '2024-10-03 00:46:34'),
(10, 'General', 'Understanding LGBTQIA+ and SOGIE', 'Use SOGIE as a framework to better understand and advocate for the LGBTQIA+ community. Determine how to engage with members of the LGBTQIA+ community respectfully. Apply the above objectives in the context of the workplace.', 'https://app.au.safetyculture.com/training/manage/course/66fe5b473f43973a964084c7/edit', 'SafetyCulture', 0, '2024-10-03 00:53:58', '2024-10-03 00:53:58'),
(11, 'Leadership', 'How to be a Passionate Leader', 'This course explains how to impact others as a leader in a positive manner.', 'https://app.au.safetyculture.com/training/manage/courseware?show=content-library&course-id=5e99477a46255b0008620167', 'SafetyCulture', 0, '2024-10-03 00:55:04', '2024-10-03 00:55:04'),
(12, 'General', 'How to Use LinkedIn Learning', 'Ready to skill up? LinkedIn Learning bridges the gap between the career you want and the skills you need. We help the world\'s professionals achieve more. Learn online, at your own pace, with our library of 20,000+ business, creative, and technology courses, on a wide array of subjects—from communication skills to programming languages. To get the most from LinkedIn Learning, we\'ve developed this short course to get you up and running, and find and consume the content that’s just right for you.', 'https://www.linkedin.com/learning/how-to-use-linkedin-learning/customize-your-account-settings?autoSkip=true&resume=false', 'LinkedIn', 0, '2024-10-03 00:58:05', '2024-10-03 00:58:05'),
(13, 'General', 'Career Advice from Some of the Biggest Names in Business', 'What if you could get career advice from the world\'s most influential thinkers, leaders, and innovators? People who have run the top companies, created the most beloved brands, transformed industries, and changed the world? Now you can. This course brings together the best insights from our collection of interviews with LinkedIn Influencers. CEOs such as Richard Branson, Bill Gates, Indra Nooyi, and Meg Whitman reveal what it takes to get your foot in the door and then work your way up. Discover why Starbucks founder Howard Schultz thinks that conviction is so critical, how Oprah found her vision, and what actress Priyanka Chopra does to find the next challenge. Each interview provides short and thoughtful tips you can use to propel your own career in the right direction.', 'https://www.linkedin.com/learning/career-advice-from-some-of-the-biggest-names-in-business/jamie-dimon-on-how-to-be-successful', 'LinkedIn', 0, '2024-10-03 01:02:04', '2024-10-03 01:02:04'),
(14, 'Business', 'Business communication: writing a SWOT analysis', 'This free course, Business communication: writing a SWOT analysis, is designed to develop your writing skills for business. You will be taken step by step through the process of writing a SWOT analysis, with clear advice on selecting key information from a case study text, making concise notes, choosing an appropriate structure and using language effectively. You will learn how to write a formal report including recommendations, based on a case study analysis of the British company, Brompton Bicycle.', 'https://www.open.edu/openlearn/money-business/business-communication-writing-swot-analysis/content-section-0?active-tab=description-tab', 'OpenLearn', 0, '2024-10-03 01:03:44', '2024-10-03 01:03:44'),
(15, 'Information Technology', 'Learn React', 'The ultimate React 101 - the perfect starting point for any React beginner. Learn the basics of modern React by solving 140+ interactive coding challenges and building eight fun projects.', 'https://v2.scrimba.com/learn-react-c0e', 'Scrimba', 0, '2024-10-03 01:07:02', '2024-10-03 01:07:02'),
(16, 'Information Technology', 'Learn TypeScript', 'Learn the basic building blocks of TypeScript while discovering firsthand how TypeScript can make your life easier and your code less error-prone.', 'https://v2.scrimba.com/learn-typescript-c03c', 'Scrimba', 0, '2024-10-03 01:07:29', '2024-10-03 01:07:29'),
(18, 'Information Technology', 'AWS Certified Solutions Architect Associate Introduction', 'Interested in getting AWS certified solutions architect associate, but not sure on how and where to start, this video will help you get certified in 30 days.\n\nThis is NOT an AWS Technical or Exam Preparation Course.  Helps you to understand the scope of AWS certification exam, needed domains to pass the exam and where you can find the exam preparation resources.', 'https://www.udemy.com/course/aws-certified-solutions-architect-associate-in-30-days/', 'Udemy', 0, '2024-10-03 01:09:25', '2024-10-03 01:09:25'),
(19, 'Information Technology', 'Learn Python - Full Course for Beginners [Tutorial]', 'This course will give you a full introduction into all of the core concepts in python. Follow along with the videos and you\'ll be a python programmer in no time!', 'https://www.youtube.com/watch?v=rfscVS0vtbw&t=2383s', 'freeCodeCamp', 0, '2024-10-03 01:10:51', '2024-10-03 01:10:51'),
(20, 'Information Technology', 'Welcome to Artificial Intelligence !', 'NON TECHNICAL COURSE specifically created for AI/ML/DL Aspirants, gives insight about Road map to A.I\n\nThis course will clear all doubts such as,\n\n1. What are prerequisites for learning AI?\n\n2. What is Road map to start Machine learning project(ML)\n\n3. How to choose the best programming language for AI ?\n\n4. How much Mathematical knowledge needed for AI ?\n\n5. Which is the best AI Engine/Tool/Framework for AI ? and so on...', 'https://www.udemy.com/course/road-map-to-artificial-intelligence-and-machine-learning/', 'Udemy', 0, '2024-10-03 01:12:11', '2024-10-03 01:12:11'),
(21, 'Information Technology', 'CS50: Introduction to Computer Science', 'This is CS50x , Harvard University\'s introduction to the intellectual enterprises of computer science and the art of programming for majors and non-majors alike, with or without prior programming experience. An entry-level course taught by David J. Malan, CS50x teaches students how to think algorithmically and solve problems efficiently. Topics include abstraction, algorithms, data structures, encapsulation, resource management, security, software engineering, and web development. Languages include C, Python, SQL, and JavaScript plus CSS and HTML. Problem sets inspired by real-world domains of biology, cryptography, finance, forensics, and gaming. The on-campus version of CS50x , CS50, is Harvard\'s largest course.', 'https://pll.harvard.edu/course/cs50-introduction-computer-science', 'Harvard University', 1, '2024-10-03 01:14:40', '2024-10-03 01:14:40'),
(22, 'Entrepreneurship', 'The Bitcoin Basics', 'Over the past couple years there has been an explosion of growth and innovation in the bitcoin space, but many people still don’t really understand what bitcoin is, or why it’s exciting to so many entrepreneurs and investors.\n\nDraper University and Zapchain have come together with the goal of making the most comprehensive bitcoin course. By making bitcoin more approachable, we hope to inspire people to innovate with Bitcoin, because we believe that bitcoin has transformative potential.', 'https://www.udemy.com/course/the-bitcoin-course/', 'Udemy', 0, '2024-10-03 01:26:59', '2024-10-03 19:55:59'),
(28, 'General', 'Master Microsoft Excel', 'Employers around the world cite Microsoft Excel as one of the most sought-after skills for any new hire. This learning path helps you become an Excel power user—covering everything from functions and formatting to PivotTables and dashboards.', 'https://www.linkedin.com/learning/paths/master-microsoft-excel', 'LinkedIn', 0, '2024-10-03 21:50:04', '2024-10-03 21:50:04'),
(29, 'Entrepreneurship', 'Save  Share Start and Manage a Small Business', 'Start your own business and manage it well from the start. From clarifying your business idea to managing the legal, financial, and operational aspects of your business, you\'ll learn everything you need to know to successfully launch and manage your own small business.', 'https://www.linkedin.com/learning/paths/start-and-manage-a-small-business', 'LinkedIn', 0, '2024-10-03 21:50:55', '2024-10-03 21:50:55'),
(30, 'Entrepreneurship', 'Entrepreneurship Foundations', 'Join Kim Kaupe as she shares the steps to becoming a successful entrepreneur. Kim begins by providing a set of tools to assess a potential business opportunity, outlines some of the challenges you might face, and offers a formula for starting small and creating your new company. She covers how to raise funds and the importance of having the right tools available. She also identifies the important people in the process of entrepreneurship and how each plays a powerful role in your success. Finally, Kim shares how to find a tribe of supporters and how to scale your new business.', 'https://www.linkedin.com/learning/entrepreneurship-foundations-2019/time-to-start-your-startup', 'LinkedIn', 0, '2024-10-03 21:51:40', '2024-10-03 21:51:40'),
(31, 'Entrepreneurship', 'Entrepreneurship Learning Pathway', 'Discover what you’ll need to succeed as a small business owner. Learn entrepreneurship essentials, from finding and testing your business idea and raising capital to marketing your small business.', 'https://www.linkedin.com/learning/paths/entrepreneurship-learning-pathway', 'LinkedIn', 0, '2024-10-03 21:52:21', '2024-10-03 21:52:21'),
(32, 'Entrepreneurship', 'Pitching to Investors', 'Find out what angel investors and venture capital firms are looking for in this course by investor and entrepreneur Jana Trantow. If you are looking to fund your business idea, it is important to understand how private equity differs from traditional lending and the difference between angel investors and venture capital firms. Jana also outlines what milestones or stages of companies angel investors and VCs look for. If your business idea is right for private equity funding, Jana provides guidance on how to connect with investors, prepare for an investor meeting, and deliver your pitch, and offers tips for following up.', 'https://www.linkedin.com/learning/pitching-to-investors', 'LinkedIn', 0, '2024-10-03 21:53:00', '2024-10-03 21:53:00'),
(33, 'General', 'Having Difficult Conversations', 'Conflict is inevitable—in work and in life. Managers must address performance issues, and colleagues with competing priorities must figure out how to work together. These situations call for having difficult conversations. In this course, Marlene Chism explains how to have difficult conversations, build your communication skills, and improve your relationships, teamwork, and business performance. She explains how to identify underlying differences in work styles, goals, and power dynamics and change the way you view conflict. She provides a model to move the conversation in a positive direction and to determine next steps. Plus, learn how to check for resistance with a single useful phrase.', 'https://www.linkedin.com/learning/having-difficult-conversations-2018', 'LinkedIn', 0, '2024-10-03 21:53:56', '2024-10-03 21:53:56'),
(34, 'General', 'Leading Yourself', 'Before you can effectively lead others, you need to lead yourself. In this course, learn how to manage your mindset, behaviors, and workplace relationships to help you stand out in your organization and in your industry as a leader. Whether you\'re on the management track or you\'re an individual contributor, authors and leadership experts Lisa Earle McLeod and Elizabeth Lotardo can help you take charge of your own learning. They explain when and where you need to be leading yourself, as well as how to track your goals, take charge of your own development, and even give yourself a performance review. Plus, learn tips for motivating yourself, leading your peers, and managing your boss.', 'https://www.linkedin.com/learning/leading-yourself', 'LinkedIn', 0, '2024-10-03 21:54:20', '2024-10-03 21:54:20'),
(35, 'General', 'The Three Pillars of Effective Communication', 'Effective communication starts with presence. Strong presence builds trust. A lack of presence erodes it. But what is presence, really? In this Knowable audio course, Ximena Vengoechea, author of Listen Like You Mean It: Reclaiming the Lost Art of True Connection, teaches you to become a more confident, trustworthy, and successful communicator by unlocking the three key skills of conversational presence: self-awareness, trust, and patience. Ximena shows you how to take control of your emotions through the process known as “labeling,” regulate your physical self by running a “body scan,” avoid distractions caused by unnecessary detail-orientation, and build greater rapport with others by saying less.', 'https://www.linkedin.com/learning/the-three-pillars-of-effective-communication', 'LinkedIn', 0, '2024-10-03 21:55:04', '2024-10-03 21:55:04'),
(36, 'Workplace', 'English for Common Interactions in the Workplace: Basic Level', 'In a professional environment, we’re often faced with the need to respond appropriately according to what the situation calls for, whether it be related to situations in daily life or the workplace.\n\nThis course was designed to provide the worker with linguistic tools which will enable greater ease in basic communications in the workplace.   This way, the student will be able to broaden their lexical and grammatical repertoire in English, thus increasing their professional value and skill, and contributing to not only professional but also social mobility.', 'https://www.coursera.org/learn/english-common-interactions-workplace-basic-level', 'Coursera', 0, '2024-10-03 21:56:27', '2024-10-03 21:56:27'),
(37, 'General', 'English for Career Development', 'Welcome to English for Career Development, a course created by the University of Pennsylvania, and funded by the U.S. Department of State Bureau of Educational and Cultural Affairs, Office of English Language Programs. \n\nTo enroll in this course for free, click on “Enroll now” and then select \"Full Course.  No certificate.\"\n\nThis course is designed for non-native English speakers who are interested in advancing their careers in the global marketplace.  In this course, you will learn about the job search, application, and interview process in the United States, while comparing and contrasting the same process in your home country. This course will also give you the opportunity to explore your global career path, while building your vocabulary and improving your language skills to achieve your professional goals. The first unit in this course will introduce the U.S. job application process and provide strategies for identifying the jobs that match your interests and skills. Unit 2 will take you through the steps necessary to produce a professional-looking resume. In unit 3, you will work to develop a clear and concise cover letter. The final unit of the course focuses on networking and interview skills.', 'https://www.coursera.org/learn/careerdevelopment', 'Coursera', 0, '2024-10-03 21:57:28', '2024-10-03 21:57:28'),
(38, 'Leadership', 'Self Leadership', 'Self Leadership is a course focused on enabling leaders to realise their true potential. Primarily it is about handling the negative self talk and thinking and gaining control over the destructive self. It also provides positive strategies to improve leadership identity, direction, growth and ultimately self mastery.', 'https://www.udemy.com/course/tltw-self-leadership/', 'Udemy', 0, '2024-10-03 21:58:30', '2024-10-03 21:58:30'),
(39, 'Leadership', 'Leadership Series', 'It is a comprehensive course, designed to deliver the concept of how leadership can be achieved through discipline, hard work and a commitment to improvement through experience. These key components exactly resonates with the idea of the course as the subject matter will give you a learning experience about who the leaders actually are and how can you be one of them.', 'https://www.udemy.com/course/turningleaders/', 'Udemy', 0, '2024-10-03 21:59:02', '2024-10-03 21:59:02'),
(40, 'General', 'Financial Markets', 'An overview of the ideas, methods, and institutions that permit human society to manage risks and foster enterprise.  Emphasis on financially-savvy leadership skills. Description of practices today and analysis of prospects for the future. Introduction to risk management and behavioral finance principles to understand the real-world functioning of securities, insurance, and banking industries.  The ultimate goal of this course is using such industries effectively and towards a better society.', 'https://www.coursera.org/learn/financial-markets-global#modules', 'Coursera', 1, '2024-10-03 22:00:38', '2024-10-03 22:00:38');

-- --------------------------------------------------------

--
-- Table structure for table `training_tabs`
--

CREATE TABLE `training_tabs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tabs_type` varchar(255) NOT NULL,
  `tabs_title` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `training_tabs`
--

INSERT INTO `training_tabs` (`id`, `tabs_type`, `tabs_title`, `created_at`, `updated_at`) VALUES
(1, 'Training', 'LGBTQ+ Basics', '2024-09-26 03:01:51', '2024-09-26 03:01:51'),
(2, 'Training', 'Mental Health', '2024-09-26 03:02:07', '2024-09-26 03:02:07'),
(3, 'Training', 'Inclusive Education', '2024-09-26 03:02:27', '2024-09-26 03:02:27'),
(4, 'Training', 'Workplace', '2024-09-26 03:02:32', '2024-09-26 03:02:32'),
(5, 'Training', 'Leadership', '2024-09-26 03:03:24', '2024-09-26 03:03:24'),
(6, 'Training', 'Entrepreneurship', '2024-09-26 03:04:20', '2024-09-26 03:04:20'),
(7, 'Training', 'Business', '2024-10-02 22:58:49', '2024-10-02 22:58:49'),
(8, 'Training', 'General', '2024-10-03 00:52:00', '2024-10-03 00:52:00'),
(9, 'Training', 'Information Technology', '2024-10-03 01:06:22', '2024-10-03 01:06:22');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `preferences` varchar(255) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `profile_picture` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `usertype` varchar(255) NOT NULL DEFAULT 'user',
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `preferences`, `gender`, `email`, `profile_picture`, `image`, `usertype`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Admin', 'bisexual', 'Bisexual', 'admin@gmail.com', 'profile-pictures/gGxJhWMuKorOHyB5bNSYbj6YHvONT39hiqL8lcgA.jpg', NULL, 'admin', NULL, '$2y$12$CBccbc1Cc1q4oGVkiTUMEOSxieHpLQBDuSoy2zJIvkH3m9FaBEuIu', NULL, '2024-09-26 02:12:34', '2024-09-26 02:33:04'),
(2, 'User', 'Male', 'Male', 'user@gmail.com', 'profile-pictures/GvF6ZyIFD8Xp4hn6ya0HNDBEVEZrGZ6mSLWEObm3.jpg', NULL, 'user', NULL, '$2y$12$iGxCgqynyBgAxw0Qi7aNRewqKQgle1r0Z3hyISDNNn5p.f8J8YTXG', NULL, '2024-09-26 02:13:39', '2024-09-29 01:46:56'),
(5, 'Doe', 'transgender', 'transgender', 'doe@gmail.com', NULL, NULL, 'user', NULL, '$2y$12$xtGlX5ZLMXKsWyreL0lfneYHEokLU083kqOxT2KQmRQRx98Uaqt66', NULL, '2024-10-01 06:51:25', '2024-10-01 06:51:25'),
(8, 'newtest', 'bisexual', 'bisexual', 'new@gmail.com', NULL, NULL, 'user', NULL, '$2y$12$oIppIf7HehdT2AtUbCmb/eR/qlvAi0joTeRXQfduo.YIIFYwrKGoS', NULL, '2024-10-01 06:57:00', '2024-10-01 06:57:00'),
(10, 'testing', 'asexual', 'asexual', 'testing@gmail.com', NULL, NULL, 'user', NULL, '$2y$12$5cxx4biH9pYzZiLSw/2phObG0SttKb815HyQVdSCgTfGWUtBFbTjW', NULL, '2024-10-02 01:12:15', '2024-10-02 01:12:15'),
(11, 'test', 'transgender', 'transgender', 'testdev@gmail.com', NULL, NULL, 'user', NULL, '$2y$12$TaI6oiMBRbC1ENUPLa9Vw.SenPEw2iqHxodwQdv8s8Io.5AN5X476', NULL, '2024-10-03 04:39:25', '2024-10-03 04:39:25');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blogs`
--
ALTER TABLE `blogs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `comments_blog_id_foreign` (`blog_id`);

--
-- Indexes for table `experiences`
--
ALTER TABLE `experiences`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `hotlines`
--
ALTER TABLE `hotlines`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `likes_user_id_foreign` (`user_id`),
  ADD KEY `likes_map_id_foreign` (`map_id`);

--
-- Indexes for table `location_services`
--
ALTER TABLE `location_services`
  ADD PRIMARY KEY (`id`),
  ADD KEY `location_services_marker_location_id_foreign` (`marker_location_id`);

--
-- Indexes for table `maps`
--
ALTER TABLE `maps`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `map_selections`
--
ALTER TABLE `map_selections`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `marker_location`
--
ALTER TABLE `marker_location`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `ratings`
--
ALTER TABLE `ratings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ratings_map_id_foreign` (`map_id`);

--
-- Indexes for table `resources`
--
ALTER TABLE `resources`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `supports`
--
ALTER TABLE `supports`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tabs`
--
ALTER TABLE `tabs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `trainings`
--
ALTER TABLE `trainings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `training_tabs`
--
ALTER TABLE `training_tabs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `blogs`
--
ALTER TABLE `blogs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `experiences`
--
ALTER TABLE `experiences`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `feedback`
--
ALTER TABLE `feedback`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `hotlines`
--
ALTER TABLE `hotlines`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `likes`
--
ALTER TABLE `likes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `location_services`
--
ALTER TABLE `location_services`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `maps`
--
ALTER TABLE `maps`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `map_selections`
--
ALTER TABLE `map_selections`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `marker_location`
--
ALTER TABLE `marker_location`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ratings`
--
ALTER TABLE `ratings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `resources`
--
ALTER TABLE `resources`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `supports`
--
ALTER TABLE `supports`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tabs`
--
ALTER TABLE `tabs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `trainings`
--
ALTER TABLE `trainings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `training_tabs`
--
ALTER TABLE `training_tabs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_blog_id_foreign` FOREIGN KEY (`blog_id`) REFERENCES `blogs` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_map_id_foreign` FOREIGN KEY (`map_id`) REFERENCES `maps` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `likes_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `location_services`
--
ALTER TABLE `location_services`
  ADD CONSTRAINT `location_services_marker_location_id_foreign` FOREIGN KEY (`marker_location_id`) REFERENCES `marker_location` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `ratings`
--
ALTER TABLE `ratings`
  ADD CONSTRAINT `ratings_map_id_foreign` FOREIGN KEY (`map_id`) REFERENCES `maps` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
