-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 25, 2024 at 02:30 PM
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
-- Database: `online_game`
--

-- --------------------------------------------------------

--
-- Table structure for table `scores`
--

CREATE TABLE `scores` (
  `score_id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `likes` int(11) DEFAULT 0,
  `timescore` float DEFAULT 0,
  `comments` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `scores`
--

INSERT INTO `scores` (`score_id`, `username`, `likes`, `timescore`, `comments`) VALUES
(1, 'mario', 13, 45, 'mario : dasd\nmario : asda\nmario : asdasd\nmario : asdasd\nmario : asdasd\nmario : asdasd\nmario : asdasd\nmario : sdasdasd\nmario : asasd\nmario : dddd\nmario : asdasd\nmario : asasdasd\nmario : asdasdasd\nmario : asdasd\nmario : dd\nmario : asdasd\nmario : sadsad\nmario : asdasdasasd\nmario : ddd\nmario : asasdasd\n'),
(2, 'mario', 13, 54, 'mario : dddd\nmario : asdasd\nmario : asdasd\nmario : asdasd\nmario : asd\nmario : sdfsdf\nmario : ddd\nmario : asdasd\nmario : asdasd\nmario : asdasd\n'),
(3, 'mario', 43, 14.72, 'mario : asdasd\nmario : ddd\nmario : dddasd\nmario : asdasd\nmario : asdasd\nmario : asdasd\nmario : asdasd\nmario : asdasd\nmario : asdasd\nmario : asdasd\nmario : saasd\nmario : asdasd\nmario : asd\nmario : dd\nmario : asdasd\n'),
(5, 'mario', 3, 444, 'phum : asdasd\nphum : asdasd\nphum : asdasd\nphum : asd\nphum : asdasd\nphum : asd\nphum : asdasd\nphum : asdasd\nphum : asdasd\n'),
(6, 'mario', 3, 8787, ''),
(7, 'mario', 2, 78, 'mario : sdasd\nmario : ddd\nmario : asdasd\nmario : asdasdsa\nmario : asdasd\nmario : asdasd\nmario : asdasd\nmario : asdasd\nmario : asdasd\nmario : asd\nmario : adad\n'),
(9, 'd', 0, 44.88, ''),
(10, 'phum', 1, 45, ''),
(11, 'phum', 1, 37.31, 'phum : sdasd\nphum : sadasdasd\n'),
(12, 'phum', 1, 35.39, ''),
(13, 'phum', 2, 20.66, 'phum : super\nphum : cool\n'),
(14, 'phum', 1, 14.63, 'phum : asdad\nphum : asdasd\nphum : asdasd\nphum : asdasd\nphum : หกหกดหกฟหก\nphum : หกกก\n'),
(15, 'phum', 1, 11.96, 'phum : sddsf\nphum : asdasdasd\nphum : asdasd\nphum : asdasd\nphum : asdasd\nphum : asd\nphum : asd\nphum : wqe\nphum : asdasd\n'),
(16, 'phum', 1, 20.39, ''),
(17, 'phum', 1, 17.89, ''),
(18, 'phum', 1, 13.86, 'phum : dsffdsdfdafdsasf\nphum : asdasdASD\nphum : ASDASD\nphum : ASD\nphum : ASDAS\nphum : ASD\nphum : ASDASD\nphum : ASDASD\nphum : DDDDDDDDDDDDDDDDDDDDDD\nphum : DDDDDDDDDDDDDDDDDDDDDDDD\nphum : DDDDDDDDDDDDDDDDDDDDDDDDDDDDD\nphum : DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD\nphum : DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD\n'),
(19, 'phum', 1, 10.09, 'phum : sadasd\nphum : adasd\n'),
(20, 'phum', 1, 13.75, ''),
(21, 'phum', 1, 14.79, ''),
(22, 'phum', 1, 14.37, ''),
(23, 'phum', 1, 14.4, ''),
(24, 'aoxa', 1, 17.24, ''),
(25, 'aoxa', 0, 14.8, ''),
(26, 'aoxa', 0, 13.52, ''),
(27, 'aoxa', 0, 15.13, ''),
(28, 'aoxa', 0, 15.72, ''),
(29, 'aoxa', 0, 14.31, ''),
(30, 'aoxa', 0, 14.25, ''),
(31, 'aoxa', 0, 15.59, ''),
(32, 'aoxa', 0, 16.18, ''),
(33, 'aoxa', 0, 15.79, ''),
(34, 'phum', 0, 10.82, 'phum : กหหกดหกด\nphum : หฟกหก\nphum : ฟหกกก\nphum : ฟหกฟหก\nphum : ฟหกกหฟก\n'),
(35, 'phum', 0, 13.23, ''),
(36, 'phum', 0, 11.43, 'phum : asdasd\nphum : asdasd\nphum : asdasd\nphum : sadasd\n'),
(37, 'phum', 0, 18.56, ''),
(38, 'phum', 0, 11.8, ''),
(39, 'phum', 0, 17.58, ''),
(40, 'phum', 0, 14.43, ''),
(41, 'phum', 0, 22.59, ''),
(42, 'phum', 0, 15.38, ''),
(43, 'phum', 0, 12.36, 'phum : asdasd\nphum : sadasd\nphum : asdasd\nphum : asdasd\n'),
(44, 'phum', 0, 12.29, 'phum : asdasd\nphum : asdasd\nphum : asdasd\nphum : asdasd\nphum : asdasd\nphum : asdasd\nphum : asdasd\n'),
(45, 'phum', 0, 13.13, ''),
(46, 'phum', 0, 11.1, 'phum : asdasdasd\nphum : asdasd\nphum : sadasd\nphum : asdasd\nphum : asdasd\n'),
(47, 'phum', 0, 12.43, ''),
(48, 'phum', 0, 11.39, 'phum : asdasdasd\nphum : asdasdasd\nphum : asdasd\nphum : asdasd\nphum : asdasd\nphum : afdsdfsdf\nphum : sdfsdf\nphum : sdfsdf\nphum : sdfsdf\nphum : sdfsdf\nphum : sdfsdf\n'),
(49, 'phum', 0, 14.07, ''),
(50, 'phum', 0, 29.08, ''),
(51, 'phum', 0, 16.52, ''),
(54, 'phum', 0, 444, ''),
(55, 'phum', 0, 18.67, ''),
(56, 'phum', 0, 25.38, ''),
(57, 'phum', 0, 13.14, ''),
(58, 'phum', 0, 16.64, ''),
(59, 'phum', 0, 12.62, ''),
(60, 'phum', 0, 11.32, ''),
(61, 'phum', 0, 10.43, ''),
(62, 'phum', 0, 10.94, ''),
(63, 'phum', 0, 10.2, ''),
(64, 'phum', 0, 9.9, ''),
(65, 'phum', 0, 11.1, ''),
(66, 'phum', 0, 13.06, ''),
(67, 'phum', 0, 10.04, ''),
(68, 'phum', 0, 10.97, ''),
(69, 'phum', 0, 11.96, ''),
(70, 'phum', 0, 8.98, 'phum : ภูมิไงจะใครละ \n'),
(71, 'phum', 0, 10.45, ''),
(72, 'phum', 0, 11.19, ''),
(73, 'phum', 0, 14.48, ''),
(74, 'phum', 0, 12.96, ''),
(75, 'phum', 0, 11.69, ''),
(76, 'phum', 0, 10.96, ''),
(77, 'phum', 0, 11.98, ''),
(78, 'phum', 0, 10.74, ''),
(79, 'phum', 2, 8.63, 'phum : ภูมิเองจ้า\r\nmario : very good!\r\naoxa : nice!\n'),
(80, 'phum', 0, 12.64, ''),
(81, 'phum', 0, 11.46, ''),
(82, 'phum', 0, 10.86, ''),
(83, 'phum', 0, 10.9, ''),
(84, 'phum', 0, 10.07, ''),
(85, 'phum', 0, 10.36, ''),
(86, 'phum', 0, 15.62, ''),
(87, 'phum', 0, 12.09, ''),
(88, 'phum', 0, 11.12, ''),
(89, 'mario', 0, 9.46, ''),
(90, 'mario', 0, 10.89, '');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `profilepic` varchar(255) DEFAULT 'avatar.png'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `password`, `profilepic`) VALUES
(1, 'phum', '123', 'avatar-1732541038578.png'),
(2, 'mario', 'red', 'avatar-1732444818691.jpg'),
(3, 'aoxa', 'red', 'avatar-1732456386773.png'),
(4, 'ddddd', '1', 'avatar-1732445473405.png');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `scores`
--
ALTER TABLE `scores`
  ADD PRIMARY KEY (`score_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `scores`
--
ALTER TABLE `scores`
  MODIFY `score_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=91;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
