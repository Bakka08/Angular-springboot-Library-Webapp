-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 07, 2024 at 04:13 PM
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
-- Database: `biblio`
--

-- --------------------------------------------------------

--
-- Table structure for table `book`
--

CREATE TABLE `book` (
  `id` int(11) NOT NULL,
  `author` varchar(255) DEFAULT NULL,
  `edition` varchar(255) DEFAULT NULL,
  `genre` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `isavailable` varchar(255) DEFAULT NULL,
  `isbn` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `book`
--

INSERT INTO `book` (`id`, `author`, `edition`, `genre`, `image`, `isavailable`, `isbn`, `status`, `title`) VALUES
(1, 'Matt Ridley ', 'May 19, 2020', 'Business', 'https://m.media-amazon.com/images/I/41+9XUzKxaL._SY445_SX342_.jpghttps://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1616249417i/48714754.jpg', 'available', '02337', 'new', 'How Innovation Works'),
(2, 'Morgan Housel', 'September 8, 2020', 'Business', 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1581443441i/51181015.jpg', 'available', '01233', 'new', 'The Psychology of Money'),
(3, 'Paul Jarvis', 'January 15, 2019', 'Business', 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1519976350i/37570605.jpg', 'available', '097654', 'new', 'Company of One'),
(4, 'Alex Marzano-Lesnevich ', 'May 16, 2017', 'Mystery/Thriller', 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1496316115i/32076678.jpg', 'available', '065432', 'new', 'The Fact of a Body');

-- --------------------------------------------------------

--
-- Table structure for table `damage_report`
--

CREATE TABLE `damage_report` (
  `id` int(11) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `report_date` varchar(255) DEFAULT NULL,
  `book_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `loan`
--

CREATE TABLE `loan` (
  `id` int(11) NOT NULL,
  `borrow_date` varchar(255) DEFAULT NULL,
  `due_date` datetime(6) DEFAULT NULL,
  `return_date` varchar(255) DEFAULT NULL,
  `book_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `contact_number` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `membership_number` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `contact_number`, `email`, `first_name`, `last_name`, `membership_number`) VALUES
(6, '609294842', 'samihsaad@gmail.com', 'saad', 'samih', '085543'),
(7, '609295030', 'user@gmail.com', 'samir', 'sa', '085530');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `book`
--
ALTER TABLE `book`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_ehpdfjpu1jm3hijhj4mm0hx9h` (`isbn`);

--
-- Indexes for table `damage_report`
--
ALTER TABLE `damage_report`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKeu4g3p7sifnndmtisdwq98tr5` (`book_id`);

--
-- Indexes for table `loan`
--
ALTER TABLE `loan`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK88c0ydlo57pcgp137tntrgqx1` (`book_id`),
  ADD KEY `FKxxm1yc1xty3qn1pthgj8ac4f` (`user_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `book`
--
ALTER TABLE `book`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `damage_report`
--
ALTER TABLE `damage_report`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `loan`
--
ALTER TABLE `loan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `damage_report`
--
ALTER TABLE `damage_report`
  ADD CONSTRAINT `FKeu4g3p7sifnndmtisdwq98tr5` FOREIGN KEY (`book_id`) REFERENCES `book` (`id`);

--
-- Constraints for table `loan`
--
ALTER TABLE `loan`
  ADD CONSTRAINT `FK88c0ydlo57pcgp137tntrgqx1` FOREIGN KEY (`book_id`) REFERENCES `book` (`id`),
  ADD CONSTRAINT `FKxxm1yc1xty3qn1pthgj8ac4f` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
