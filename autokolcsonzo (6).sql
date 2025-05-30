-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: localhost:8889
-- Létrehozás ideje: 2025. Ápr 27. 21:59
-- Kiszolgáló verziója: 8.0.40
-- PHP verzió: 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `autokolcsonzo`
--

DELIMITER $$
--
-- Eljárások
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `addBookings` (IN `user_idIN` INT(11), IN `car_idIN` INT(11), IN `pickup_dateIN` DATETIME, IN `return_dateIN` DATETIME, IN `total_priceIN` DECIMAL(8,2), IN `full_to_fullIN` BOOLEAN)   BEGIN
    INSERT INTO `bookings` 
    (`bookings`.`user_id`, `bookings`.`car_id`, `bookings`.`pickup_date`, `bookings`.`return_date`, `bookings`.`total_price`, `bookings`.`full_to_fulll`)
    VALUES 
    (user_idIN, car_idIN, pickup_dateIN, return_dateIN, total_priceIN, full_to_fullIN);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `addCar` (IN `brandIN` ENUM('Toyota','Honda','Volvo','Fiat','Volkswagen') CHARSET utf8mb4, IN `modelIN` VARCHAR(50) CHARSET utf8mb4, IN `license_plateIN` VARCHAR(50) CHARSET utf8mb4, IN `yearIN` YEAR, IN `fuel_typeIN` ENUM('Diesel','Benzin','Hybrid','Elektromos') CHARSET utf8mb4, IN `priceIN` DECIMAL(7,2), IN `transmissionIN` VARCHAR(50), IN `doorsIN` INT(9), IN `ACIN` BOOLEAN, IN `seatIN` INT(9), IN `imageIN` TEXT CHARSET utf8mb4)   BEGIN
    INSERT INTO `cars` 
    (`cars`.`brand`, `cars`.`model`, `cars`.`license_plate`, `cars`.`year`, `cars`.`fuel_type`, `cars`.`price_per_day`, `cars`.`transmission`, `cars`.`doors`, `cars`.`AC`, `cars`.`seats`,`cars`.`image`)
    VALUES 
    (brandIN, modelIN, license_plateIN, yearIN, fuel_typeIN, priceIN, transmissionIN, doorsIN, ACIN, seatIN, imageIN);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `addCarExtra` (IN `car_idIN` INT(11), IN `extra_nameIN` VARCHAR(50), IN `extra_costIN` DECIMAL(8,2))   BEGIN
    INSERT INTO `car_extras` 
    (`car_id`, `extra_name`, `extra_cost`)
    VALUES 
    (car_idIN, extra_nameIN, extra_costIN);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `changePassword` (IN `idIN` INT(11), IN `newPasswordIN` VARCHAR(255), IN `creatorIN` INT(11))   BEGIN

IF creatorIN = idIN THEN
UPDATE `users`
    SET `users`.`password` = SHA1(newPasswordIN)
    WHERE `users`.`id` = idIN;
ELSE
SELECT "Nincs jogod ehhez!";
END IF;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `deleteBookingById` (IN `idIN` INT(11))   UPDATE `bookings` 
SET `bookings`.`is_deleted` = 1
WHERE `bookings`.`id` = idIN$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `deleteCarById` (IN `idIN` INT(11))   UPDATE `cars` 
SET `cars`.`is_deleted` = 1
WHERE `cars`.`id` = idIN$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `deleteCarExtra` (IN `idIN` INT(11))   DELETE FROM `car_extras` WHERE `car_extras`.`id` = idIN$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `deleteUserById` (IN `user_idIN` INT(11))   UPDATE `users` 
SET `users`.`is_deleted` = 1
WHERE `users`.`id` = user_idIN$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getAllAdmin` ()   SELECT * FROM `users` WHERE `users`.`is_admin` = 1 AND `users`.`is_deleted` = 0$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getAllAvailableCar` ()   BEGIN
    SELECT * FROM `car_availability` 
    WHERE `car_availability`.`status` = 1 AND `car_availability`.`is_deleted` = 0 ;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getAllBookings` ()   SELECT * FROM `bookings` WHERE `bookings`.`is_deleted` = 0$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getAllCar` ()   SELECT * FROM `cars` WHERE `cars`.`is_deleted` = 0$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getAllCarsPage` (IN `amountIN` INT(11), IN `pageIN` INT(11), OUT `rowCountOUT` INT(11))   BEGIN

DECLARE page INT;
SET page = (pageIN - 1) * amountIN;

SELECT
`cars`.`id`,
`cars`.`brand`,
`cars`.`model`,
`cars`.`year`,
`cars`.`doors`,
`cars`.`fuel_type`,
`cars`.`transmission`,
`cars`.`AC`,
`cars`.`seats`,
`cars`.`price_per_day`,
`cars`.`image`

FROM `cars`
WHERE `cars`.`deleted_at` IS NULL
LIMIT page, amountIN;

SET rowCountOUT = (
SELECT COUNT(`cars`.`id`)
    FROM `cars`
    WHERE `cars`.`deleted_at` IS NULL
);

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getAllReservedCar` ()   BEGIN
    SELECT * FROM `car_availability` 
    WHERE `car_availability`.`status` = 0 AND `car_availability`.`is_deleted` = 0;   
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getAllUser` ()   SELECT * FROM `users` WHERE `users`.`is_admin` = 0 AND `users`.`is_deleted` = 0$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getBookingById` (IN `idIN` INT(11))   SELECT * FROM `bookings` WHERE `bookings`.`id` = idIN$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getBookingByUserId` (IN `user_idIN` INT(11))   BEGIN
    SELECT * FROM `bookings` WHERE `bookings`.`user_id` = user_idIN;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getCarAvailabilityByCarId` (IN `car_idIN` INT(11))   BEGIN

SELECT `car_availability`.`status` FROM `car_availability` WHERE `car_availability`.`car_id` = car_idIN;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getCarById` (IN `idIN` INT(11))   SELECT * FROM `cars` WHERE `cars`.`id` = idIN$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getPage1` ()   SELECT * FROM `cars` LIMIT 9$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getPage2` ()   SELECT * FROM `cars` LIMIT 9 OFFSET 9$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getPageInput` (IN `pageIN` INT(8))   BEGIN

DECLARE amount INT;
SET amount = (pageIN-1) * 9;

SELECT * FROM `cars` LIMIT 9 OFFSET amount;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getUserById` (IN `user_idIN` INT(11))   SELECT * FROM `users` WHERE `users`.`id` = user_idIN$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getUserDetailsByCarId` (IN `car_idIN` INT(11))   BEGIN
    SELECT u.*
    FROM Users u
    JOIN Bookings b ON u.id = b.user_id
    WHERE b.car_id = car_idIN;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `isAdminExists` (IN `emailIN` VARCHAR(100), OUT `resultOUT` BOOLEAN)   SET resultOUT = EXISTS(SELECT `users`.`id` FROM `users` WHERE `users`.`email` = emailIN AND `users`.`is_admin` = 1)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `isUserExists` (IN `emailIN` VARCHAR(100), OUT `resultOUT` BOOLEAN)   BEGIN
SET resultOUT = EXISTS(SELECT `users`.`id` FROM `users` WHERE `users`.`email` = emailIN);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `login` (IN `emailIN` VARCHAR(100), IN `passwordIN` VARCHAR(255))   SELECT * FROM `users` WHERE `users`.`email` = emailIN AND `users`.`password` = SHA1(passwordIN)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `registerAdmin` (IN `nameIN` VARCHAR(100), IN `emailIN` VARCHAR(100), IN `passwordIN` TEXT, IN `personal_idIN` VARCHAR(50))   INSERT INTO `users` (`users`.`name`, `users`.`email`, `users`.`password`, `users`.`personal_id`, `users`.`is_admin`)
VALUES(nameIN, emailIN, SHA1(passwordIN), personal_idIN,1)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `registerUser` (IN `nameIN` VARCHAR(100), IN `emailIN` VARCHAR(100), IN `passwordIN` TEXT, IN `personal_idIN` VARCHAR(50))   INSERT INTO `users` (`users`.`name`,`users`.`email`, `users`.`password`, `users`.`personal_id`, `users`.`is_admin`)
VALUES(nameIN, emailIN, SHA1(passwordIN), personal_idIN, 0)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `searchCarsBetweenDates` (IN `pickup_DateIN` DATETIME, IN `return_DateIN` DATETIME)   BEGIN
    SELECT c.id AS car_id, c.brand, c.model, b.pickup_date, b.return_date
    FROM bookings b
    JOIN cars c ON b.car_id = c.id
    JOIN car_availability ca ON c.id = ca.car_id
    WHERE b.pickup_date >= pickup_DateIN
      AND b.return_date <= return_DateIN
      AND ca.status = 1;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `updateCarAvailability` (IN `idIN` INT(11), IN `dateIN` DATETIME, IN `statusIN` TINYINT)   BEGIN
UPDATE `car_availability` SET `car_availability`.`date` = dateIN WHERE `car_availability`.`id` = idIN;
UPDATE `car_availability` SET `car_availability`.`status` = statusIN WHERE `car_availability`.`id` = idIN;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `updateCarById` (IN `idIN` INT(11), IN `brandIN` ENUM('Toyota','Honda','Volvo','Fiat','Volkswagen'), IN `modelIN` VARCHAR(50), IN `license_lateIN` VARCHAR(50), IN `yearIN` YEAR, IN `fuel_typeIN` ENUM('Diesel','Benzin','Hibryd','Elektromos'), IN `price_per_dayIN` DECIMAL(7,2), IN `transmissionIN` VARCHAR(50), IN `doorsIN` INT(2), IN `ACIN` TINYINT, IN `seatIN` INT(2), IN `imageIN` TEXT)   BEGIN
UPDATE `cars` SET `cars`.`brand` = brandIN WHERE `cars`.`id` = idIN;
UPDATE `cars` SET `cars`.`model` = modelIN WHERE `cars`.`id` = idIN;
UPDATE `cars` SET `cars`.`license_plate` = license_lateIN WHERE `cars`.`id` = idIN;
UPDATE `cars` SET `cars`.`year` = yearIN WHERE `cars`.`id` = idIN;
UPDATE `cars` SET `cars`.`fuel_type` = fuel_typeIN WHERE `cars`.`id` = idIN;
UPDATE `cars` SET `cars`.`price_per_day` = price_per_dayIN WHERE `cars`.`id` = idIN;
UPDATE `cars` SET `cars`.`transmission` = transmissionIN WHERE `cars`.`id` = idIN;
UPDATE `cars` SET `cars`.`doors` = doorsIN WHERE `cars`.`id` = idIN;
UPDATE `cars` SET `cars`.`AC` = ACIN WHERE `cars`.`id` = idIN;
UPDATE `cars` SET `cars`.`seats` = seatIN WHERE `cars`.`id` = idIN;
UPDATE `cars` SET `cars`.`image` = imageIN WHERE `cars`.`id` = idIN;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `updateCarService` (IN `car_idIN` INT(11), IN `service_dateIN` DATETIME, IN `descriptionIN` TEXT, IN `costIN` DECIMAL(8,2))   BEGIN
UPDATE `car_service` SET `car_service`.`service_date` = service_dateIN WHERE `car_service`.`car_id` = car_idIN;
UPDATE `car_service` SET `car_service`.`description` = descriptionIN WHERE `car_service`.`car_id` = car_idIN;
UPDATE `car_service` SET `car_service`.`cost` = costIN WHERE `car_service`.`car_id` = car_idIN;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `updatePaymentCost` (IN `idIN` INT(11), IN `amountIN` DECIMAL(8,2))   UPDATE `payment` SET `payment`.`amount` = amountIN WHERE `payment`.`id` = idIN$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `updatePaymentStatus` (IN `idIN` INT(11), IN `payment_statusID` ENUM('Completed','Pending','Failed'))   BEGIN
UPDATE `payment` SET `payment`.`payment_status` = payment_statusID WHERE `payment`.`id` = idIN;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `updateUserById` (IN `user_idIN` INT(11), IN `nameIN` VARCHAR(100), IN `emailIN` VARCHAR(100), IN `personal_idIN` VARCHAR(50))   BEGIN
UPDATE `users` SET `users`.`name` = nameIN WHERE `users`.`id` = user_idIN;
UPDATE `users` SET `users`.`email` = emailIN WHERE `users`.`id` = user_idIN;
UPDATE `users` SET `users`.`personal_id` = personal_idIN WHERE `users`.`id` = user_idIN;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `verifyAdmin` (IN `emailIN` VARCHAR(100), OUT `resultOUT` BOOLEAN)   SET resultOUT = EXISTS(SELECT `users`.`id` FROM `users` WHERE `users`.`email` = emailIN AND `users`.`is_admin` = 1)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `verifyUser` (IN `login_idIN` INT(11), IN `emailIN` VARCHAR(100), IN `passwordIN` TEXT)   BEGIN 

DECLARE login_exists INT; 
DECLARE user_exists INT;

    -- Ellenőrizzük, hogy létezik-e a megadott login_id
    SELECT COUNT(*) INTO login_exists  
    FROM `login`  
    WHERE `login`.`id` = login_idIN; 
    
    IF login_exists > 0 THEN
        -- Ha van login_id, ellenőrizzük, hogy a login_id-hez tartozó user_id-vel egyező felhasználó létezik-e az adott email és jelszó alapján
        SELECT COUNT(*) INTO user_exists 
        FROM `users`
        JOIN `login` ON `users`.`id` = `login`.`user_id`  -- Kapcsolat a login és users tábla között
        WHERE `login`.`id` = login_idIN
        AND `users`.`email` = emailIN
        AND `users`.`password` = passwordIN;
        
        IF user_exists > 0 THEN
            -- Ha mindkettő létezik, adjuk vissza a felhasználó adatait
            SELECT `users`.* 
            FROM `users` 
            JOIN `login` ON `users`.`id` = `login`.`user_id` 
            WHERE `login`.`id` = login_idIN
            AND `users`.`email` = emailIN
            AND `users`.`password` = passwordIN;
        ELSE
            -- Ha a felhasználó nem létezik a megadott adatokkal
            SELECT 0 AS result;
        END IF;
    ELSE 
        -- Ha nincs regisztráció a megadott login_id alapján
        SELECT 0 AS result; 
    END IF;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `verifyUserr` (IN `emailIN` VARCHAR(100), OUT `resultOUT` BOOLEAN)   SET resultOUT = EXISTS(SELECT `users`.`id` FROM `users` WHERE `users`.`email` = emailIN AND `users`.`is_admin` = 0)$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `bookings`
--

CREATE TABLE `bookings` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `car_id` int NOT NULL,
  `pickup_date` datetime NOT NULL,
  `return_date` datetime NOT NULL,
  `total_price` decimal(8,2) NOT NULL,
  `full_to_fulll` tinyint(1) NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- A tábla adatainak kiíratása `bookings`
--

INSERT INTO `bookings` (`id`, `user_id`, `car_id`, `pickup_date`, `return_date`, `total_price`, `full_to_fulll`, `is_deleted`, `created_at`, `deleted_at`) VALUES
(2, 2, 102, '2025-09-02 08:00:00', '2025-09-07 08:00:00', 250.00, 1, 0, '2024-09-13 13:36:58', NULL),
(3, 3, 103, '2025-09-03 10:00:00', '2025-09-08 10:00:00', 425.00, 1, 0, '2024-09-13 13:36:58', NULL),
(4, 4, 104, '2025-09-04 11:00:00', '2025-09-06 11:00:00', 80.00, 0, 0, '2024-09-13 13:36:58', NULL),
(5, 5, 105, '2025-09-05 12:00:00', '2025-09-10 12:00:00', 300.00, 1, 0, '2024-09-13 13:36:58', NULL),
(6, 6, 106, '2025-09-06 13:00:00', '2025-09-09 13:00:00', 210.00, 0, 0, '2024-09-13 13:36:58', NULL),
(7, 7, 107, '2025-09-07 14:00:00', '2025-09-11 14:00:00', 240.00, 1, 0, '2024-09-13 13:36:58', NULL),
(8, 8, 108, '2025-09-08 15:00:00', '2025-09-13 15:00:00', 400.00, 1, 0, '2024-09-13 13:36:58', NULL),
(9, 9, 109, '2025-09-09 16:00:00', '2025-09-12 16:00:00', 105.00, 0, 0, '2024-09-13 13:36:58', NULL),
(10, 10, 110, '2025-09-10 17:00:00', '2025-09-14 17:00:00', 260.00, 1, 0, '2024-09-13 13:36:58', NULL),
(11, 11, 111, '2025-09-11 09:30:00', '2025-09-16 09:30:00', 225.00, 1, 0, '2024-09-13 13:36:58', NULL),
(12, 12, 112, '2025-09-12 10:30:00', '2025-09-18 10:30:00', 450.00, 1, 0, '2024-09-13 13:36:58', NULL),
(13, 13, 113, '2025-09-13 11:30:00', '2025-09-19 11:30:00', 510.00, 1, 0, '2024-09-13 13:36:58', NULL),
(14, 14, 114, '2025-09-14 12:30:00', '2025-09-20 12:30:00', 300.00, 0, 0, '2024-09-13 13:36:58', NULL),
(15, 15, 115, '2025-09-15 13:30:00', '2025-09-21 13:30:00', 420.00, 1, 0, '2024-09-13 13:36:58', NULL),
(16, 16, 116, '2025-09-16 14:30:00', '2025-09-22 14:30:00', 420.00, 1, 0, '2024-09-13 13:36:58', NULL),
(17, 17, 117, '2025-09-17 15:30:00', '2025-09-23 15:30:00', 315.00, 0, 0, '2024-09-13 13:36:58', NULL),
(18, 18, 118, '2025-09-18 16:30:00', '2025-09-25 16:30:00', 560.00, 1, 0, '2024-09-13 13:36:58', NULL),
(19, 19, 119, '2025-09-19 17:30:00', '2025-09-24 17:30:00', 450.00, 1, 0, '2024-09-13 13:36:58', NULL);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `booking_x_car_extras`
--

CREATE TABLE `booking_x_car_extras` (
  `id` int NOT NULL,
  `booking_id` int NOT NULL,
  `car_extras_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `cars`
--

CREATE TABLE `cars` (
  `id` int NOT NULL,
  `brand` enum('Toyota','Honda','Volvo','Fiat','Volkswagen') NOT NULL,
  `model` varchar(50) NOT NULL,
  `license_plate` varchar(50) NOT NULL,
  `year` year NOT NULL,
  `fuel_type` enum('Diesel','Benzin','Hybrid','Elektromos') NOT NULL,
  `price_per_day` decimal(7,2) NOT NULL,
  `transmission` varchar(50) NOT NULL,
  `doors` int NOT NULL,
  `AC` tinyint(1) NOT NULL,
  `seats` int NOT NULL,
  `image` text NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- A tábla adatainak kiíratása `cars`
--

INSERT INTO `cars` (`id`, `brand`, `model`, `license_plate`, `year`, `fuel_type`, `price_per_day`, `transmission`, `doors`, `AC`, `seats`, `image`, `is_deleted`, `created_at`, `deleted_at`) VALUES
(101, 'Toyota', 'Corolla', 'ABC-123', '2021', 'Benzin', 50.00, 'Automatic', 4, 1, 5, '/Photos/Toyota_Corolla.png', 0, '2024-09-13 13:27:11', NULL),
(102, 'Honda', 'Civic', 'XYZ-987', '2020', 'Diesel', 45.00, 'Manual', 5, 1, 5, '/Photos/Honda_Civic_2020.jpeg', 0, '2024-09-13 13:27:11', NULL),
(103, 'Volvo', 'XC90', 'KLM-456', '2019', 'Hybrid', 75.00, 'Automatic', 5, 1, 7, '/Photos/Volvo_XC90.jpeg', 0, '2024-09-13 13:27:11', NULL),
(104, 'Fiat', '500', 'JKL-654', '2022', 'Benzin', 40.00, 'Manual', 3, 1, 5, '/Photos/fiat_500.jpeg', 0, '2024-09-13 13:27:11', NULL),
(105, 'Volkswagen', 'Golf', 'GHI-321', '2018', 'Diesel', 55.00, 'Automatic', 5, 1, 5, '/Photos/VOlkswagen_golf.jpg', 0, '2024-09-13 13:27:11', NULL),
(106, 'Toyota', 'RAV4', 'LMN-789', '2021', 'Hybrid', 70.00, 'Automatic', 5, 1, 5, '/Photos/Toyota_RAV4.jpeg', 0, '2024-09-13 13:27:11', NULL),
(107, 'Honda', 'Accord', 'PQR-852', '2020', 'Benzin', 60.00, 'Automatic', 4, 1, 5, '/Photos/honda_accord.jpg', 0, '2024-09-13 13:27:11', NULL),
(108, 'Volvo', 'V60', 'EFG-741', '2019', 'Diesel', 65.00, 'Manual', 5, 1, 5, '/Photos/Volvo_V60.jpeg', 0, '2024-09-13 13:27:11', NULL),
(110, 'Volkswagen', 'Passat', 'OPQ-159', '2018', 'Diesel', 60.00, 'Automatic', 5, 1, 5, '/Photos/Volkswagen_passat.webp', 0, '2024-09-13 13:27:11', NULL),
(111, 'Toyota', 'Yaris', 'UVW-753', '2021', 'Hybrid', 45.00, 'Automatic', 5, 1, 5, 'toyota_yaris_2021.jpg', 0, '2024-09-13 13:27:11', NULL),
(112, 'Honda', 'CR-V', 'ZXY-258', '2020', 'Benzin', 70.00, 'Automatic', 5, 1, 5, 'honda_crv_2020.jpg', 0, '2024-09-13 13:27:11', NULL),
(113, 'Volvo', 'S60', 'BCE-963', '2019', 'Hybrid', 75.00, 'Automatic', 4, 1, 5, 'volvo_s60_2019.jpg', 0, '2024-09-13 13:27:11', NULL),
(114, 'Fiat', 'Tipo', 'PLM-147', '2022', 'Benzin', 50.00, 'Manual', 5, 1, 5, 'fiat_tipo_2022.jpg', 0, '2024-09-13 13:27:11', NULL),
(115, 'Volkswagen', 'Tiguan', 'VWX-357', '2018', 'Diesel', 65.00, 'Automatic', 5, 1, 5, 'volkswagen_tiguan_2018.jpg', 0, '2024-09-13 13:27:11', NULL),
(116, 'Toyota', 'Camry', 'HJK-246', '2021', 'Hybrid', 55.00, 'Automatic', 4, 1, 5, 'toyota_camry_2021.jpg', 0, '2024-09-13 13:27:11', NULL),
(117, 'Honda', 'Jazz', 'MNQ-864', '2020', 'Benzin', 40.00, 'Manual', 5, 1, 5, 'honda_jazz_2020.jpg', 0, '2024-09-13 13:27:11', NULL),
(118, 'Volvo', 'XC60', 'SDF-753', '2019', 'Hybrid', 70.00, 'Automatic', 5, 1, 5, 'volvo_xc60_2019.jpg', 0, '2024-09-13 13:27:11', NULL),
(119, 'Fiat', 'Ducato', 'LGH-852', '2022', 'Diesel', 80.00, 'Manual', 4, 1, 9, 'fiat_ducato_2022.jpg', 0, '2024-09-13 13:27:11', NULL),
(122, 'Toyota', 'Yaris', 'PEP-232', '2020', 'Diesel', 60.00, 'Manual', 5, 1, 5, 'yaris.jpg', 1, '2025-02-27 09:58:57', NULL);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `car_availability`
--

CREATE TABLE `car_availability` (
  `id` int NOT NULL,
  `car_id` int NOT NULL,
  `status` tinyint(1) NOT NULL COMMENT '1 az elérhető, 0 a NEM elérhető',
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- A tábla adatainak kiíratása `car_availability`
--

INSERT INTO `car_availability` (`id`, `car_id`, `status`, `is_deleted`, `created_at`, `deleted_at`) VALUES
(1, 101, 1, 0, '2024-09-10 12:00:00', NULL),
(2, 102, 1, 0, '2024-09-10 12:00:00', NULL),
(3, 103, 0, 0, '2024-09-10 12:00:00', NULL),
(4, 104, 1, 0, '2024-09-10 12:00:00', NULL),
(5, 105, 1, 0, '2024-09-10 12:00:00', NULL),
(6, 106, 0, 0, '2024-09-10 12:00:00', NULL),
(7, 107, 1, 0, '2024-09-10 12:00:00', NULL),
(8, 108, 0, 0, '2024-09-10 12:00:00', NULL),
(9, 109, 1, 0, '2024-09-10 12:00:00', NULL),
(10, 110, 1, 0, '2024-09-10 12:00:00', NULL),
(11, 111, 1, 0, '2024-09-11 12:00:00', NULL),
(12, 112, 0, 0, '2024-09-11 12:00:00', NULL),
(13, 113, 1, 0, '2024-09-11 12:00:00', NULL),
(14, 114, 0, 0, '2024-09-11 12:00:00', NULL),
(15, 115, 1, 0, '2024-09-11 12:00:00', NULL),
(16, 116, 1, 0, '2024-09-11 12:00:00', NULL),
(17, 117, 0, 0, '2024-09-11 12:00:00', NULL),
(18, 118, 1, 0, '2024-09-11 12:00:00', NULL),
(19, 119, 1, 0, '2024-09-11 12:00:00', NULL),
(20, 120, 0, 0, '2024-09-11 12:00:00', NULL);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `car_extras`
--

CREATE TABLE `car_extras` (
  `id` int NOT NULL,
  `car_id` int NOT NULL,
  `user_id` int NOT NULL COMMENT 'melyik az a user akinek kell az axtra',
  `extra_name` varchar(50) NOT NULL COMMENT 'mi az az extra neve ami kell',
  `extra_cost` decimal(8,2) NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- A tábla adatainak kiíratása `car_extras`
--

INSERT INTO `car_extras` (`id`, `car_id`, `user_id`, `extra_name`, `extra_cost`, `is_deleted`, `created_at`, `deleted_at`) VALUES
(1, 101, 0, 'Child seat', 10.00, 0, '2024-09-10 12:00:00', NULL),
(2, 102, 0, 'Roof rack', 5.00, 0, '2024-09-10 12:00:00', NULL),
(3, 103, 0, 'Additional Driver', 20.00, 0, '2024-09-10 12:00:00', NULL),
(4, 104, 0, 'Cooler Bag', 5.00, 0, '2024-09-10 12:00:00', NULL);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `car_service`
--

CREATE TABLE `car_service` (
  `id` int NOT NULL,
  `car_id` int NOT NULL,
  `service_date` datetime NOT NULL,
  `description` text NOT NULL,
  `cost` decimal(8,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- A tábla adatainak kiíratása `car_service`
--

INSERT INTO `car_service` (`id`, `car_id`, `service_date`, `description`, `cost`) VALUES
(1, 101, '2024-10-26 10:30:00', 'ksks, szűrők cseréje', 150.50),
(2, 102, '2024-09-16 09:00:00', 'Ready for reservation', 120.00),
(3, 103, '2024-09-17 09:00:00', 'Ready for reservation', 60.00),
(4, 104, '2024-09-18 09:00:00', 'Ready for reservation', 0.00),
(5, 105, '2024-09-19 09:00:00', 'Ready for reservation', 0.00),
(6, 106, '2024-09-20 09:00:00', 'Ready for reservation', 0.00),
(7, 107, '2024-09-21 09:00:00', 'Ready for reservation', 0.00),
(8, 108, '2024-09-22 09:00:00', 'Ready for reservation', 0.00),
(10, 110, '2024-09-24 09:00:00', 'Ready for reservation', 0.00),
(11, 111, '2024-09-25 09:00:00', 'Power steering fluid change', 50.00),
(12, 112, '2024-09-26 09:00:00', 'Exhaust system repair', 110.00),
(13, 113, '2024-09-27 09:00:00', 'Ready for reservation', 0.00),
(14, 114, '2024-09-28 09:00:00', 'Ready for reservation', 0.00),
(15, 115, '2024-09-29 09:00:00', 'Ready for reservation', 0.00),
(16, 116, '2024-09-30 09:00:00', 'Ready for reservation', 0.00),
(17, 117, '2024-10-01 09:00:00', 'Ready for reservation', 0.00),
(18, 118, '2024-10-02 09:00:00', 'Ready for reservation', 0.00),
(19, 119, '2024-10-03 09:00:00', 'Ready for reservation', 0.00);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `login`
--

CREATE TABLE `login` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `login_time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- A tábla adatainak kiíratása `login`
--

INSERT INTO `login` (`id`, `user_id`, `login_time`) VALUES
(1, 1, '2024-09-15 08:30:00'),
(2, 2, '2024-09-15 09:00:00'),
(3, 3, '2024-09-15 09:30:00'),
(4, 4, '2024-09-15 10:00:00'),
(5, 5, '2024-09-15 10:30:00'),
(6, 6, '2024-09-15 11:00:00'),
(7, 7, '2024-09-15 11:30:00'),
(8, 8, '2024-09-15 12:00:00'),
(9, 9, '2024-09-15 12:30:00'),
(10, 10, '2024-09-15 13:00:00'),
(11, 11, '2024-09-16 08:30:00'),
(12, 12, '2024-09-16 09:00:00'),
(13, 13, '2024-09-16 09:30:00'),
(14, 14, '2024-09-16 10:00:00'),
(15, 15, '2024-09-16 10:30:00'),
(16, 16, '2024-09-16 11:00:00'),
(17, 17, '2024-09-16 11:30:00'),
(18, 18, '2024-09-16 12:00:00'),
(19, 19, '2024-09-16 12:30:00'),
(20, 20, '2024-09-16 13:00:00');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `payment`
--

CREATE TABLE `payment` (
  `id` int NOT NULL,
  `booking_id` int NOT NULL,
  `payment_method` enum('Cash') NOT NULL,
  `payment_date` datetime NOT NULL,
  `amount` decimal(8,2) NOT NULL,
  `payment_status` enum('Completed','Pending','Failed','') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- A tábla adatainak kiíratása `payment`
--

INSERT INTO `payment` (`id`, `booking_id`, `payment_method`, `payment_date`, `amount`, `payment_status`) VALUES
(1, 1, 'Cash', '2024-09-01 14:00:00', 220.00, 'Completed'),
(2, 2, 'Cash', '2024-09-02 14:30:00', 250.00, 'Failed'),
(3, 3, 'Cash', '2024-09-03 15:00:00', 425.00, 'Pending'),
(4, 4, 'Cash', '2024-09-04 15:30:00', 90.00, 'Completed'),
(5, 5, 'Cash', '2024-09-05 16:00:00', 300.00, 'Pending'),
(6, 6, 'Cash', '2024-09-06 16:30:00', 210.00, 'Pending'),
(7, 7, 'Cash', '2024-09-07 17:00:00', 240.00, 'Completed'),
(8, 8, 'Cash', '2024-09-08 17:30:00', 400.00, 'Pending'),
(9, 9, 'Cash', '2024-09-09 18:00:00', 105.00, 'Pending'),
(10, 10, 'Cash', '2024-09-10 18:30:00', 260.00, 'Completed'),
(11, 11, 'Cash', '2024-09-11 14:00:00', 225.00, 'Pending'),
(12, 12, 'Cash', '2024-09-12 14:30:00', 450.00, 'Pending'),
(13, 13, 'Cash', '2024-09-13 15:00:00', 510.00, 'Failed'),
(14, 14, 'Cash', '2024-09-14 15:30:00', 300.00, 'Completed'),
(15, 15, 'Cash', '2024-09-15 16:00:00', 420.00, 'Pending'),
(16, 16, 'Cash', '2024-09-16 16:30:00', 420.00, 'Pending'),
(17, 17, 'Cash', '2024-09-17 17:00:00', 315.00, 'Pending'),
(18, 18, 'Cash', '2024-09-18 17:30:00', 560.00, 'Completed'),
(19, 19, 'Cash', '2024-09-19 18:00:00', 450.00, 'Pending'),
(20, 20, 'Cash', '2024-09-20 18:30:00', 300.00, 'Pending');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` text NOT NULL,
  `personal_id` varchar(50) NOT NULL,
  `is_admin` tinyint(1) NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `personal_id`, `is_admin`, `is_deleted`, `created_at`, `deleted_at`) VALUES
(1, 'John Doe', 'john.doe@gmail.com', 'a93cdd134f322b08944fab09b7941b6a16d35cee', '123456A', 0, 0, '2024-09-13 13:19:15', NULL),
(2, 'Jane Smith', 'jane.smith@yahoo.com', 'a93cdd134f322b08944fab09b7941b6a16d35cee', '234567B', 1, 0, '2024-09-13 13:19:15', NULL),
(3, 'Alex Johnson', 'alex.johnson@gmail.com', '2123f05323862a023a3f56251859dc1ebc2f9c0d', '345678C', 0, 0, '2024-09-13 13:19:15', NULL),
(4, 'Emily Davis', 'emily.davis@hotmail.com', '4476585e1256365bbf247e3e7becd4938b7f751e', '456789D', 0, 0, '2024-09-13 13:19:15', NULL),
(5, 'Michael Brown', 'michael.brown@gmail.com', '4476585e1256365bbf247e3e7becd4938b7f751e', '567890E', 0, 0, '2024-09-13 13:19:15', NULL),
(6, 'Jessica Wilson', 'jessica.wilson@yahoo.com', '4476585e1256365bbf247e3e7becd4938b7f751e', '678901F', 0, 0, '2024-09-13 13:19:15', NULL),
(7, 'Chris Lee', 'chris.lee@gmail.com', '4476585e1256365bbf247e3e7becd4938b7f751e', '789012G', 0, 0, '2024-09-13 13:19:15', NULL),
(8, 'Sarah Lewis', 'sarah.lewis@hotmail.com', '4476585e1256365bbf247e3e7becd4938b7f751e', '890123H', 0, 0, '2024-09-13 13:19:15', NULL),
(9, 'David Young', 'david.young@gmail.com', '4476585e1256365bbf247e3e7becd4938b7f751e', '901234I', 0, 0, '2024-09-13 13:19:15', NULL),
(10, 'Anna Scott', 'anna.scott@yahoo.com', '4476585e1256365bbf247e3e7becd4938b7f751e', '012345J', 0, 0, '2024-09-13 13:19:15', NULL),
(11, 'George King', 'george.king@gmail.com', '4476585e1256365bbf247e3e7becd4938b7f751e', '123450K', 0, 0, '2024-09-13 13:19:15', NULL),
(12, 'Laura Wright', 'laura.wright@yahoo.com', '4476585e1256365bbf247e3e7becd4938b7f751e', '234561L', 0, 0, '2024-09-13 13:19:15', NULL),
(13, 'Steven Baker', 'steven.baker@gmail.com', '4476585e1256365bbf247e3e7becd4938b7f751e', '345672M', 0, 0, '2024-09-13 13:19:15', NULL),
(14, 'Michelle Green', 'michelle.green@hotmail.com', '4476585e1256365bbf247e3e7becd4938b7f751e', '456783N', 0, 0, '2024-09-13 13:19:15', NULL),
(15, 'Matthew Carter', 'matthew.carter@gmail.com', '4476585e1256365bbf247e3e7becd4938b7f751e', '567894O', 0, 0, '2024-09-13 13:19:15', NULL),
(16, 'Samantha Rivera', 'samantha.rivera@yahoo.com', '4476585e1256365bbf247e3e7becd4938b7f751e', '678905P', 0, 0, '2024-09-13 13:19:15', NULL),
(17, 'Andrew Reed', 'andrew.reed@gmail.com', '4476585e1256365bbf247e3e7becd4938b7f751e', '789016Q', 0, 0, '2024-09-13 13:19:15', NULL),
(18, 'Rachel Hughes', 'rachel.hughes@hotmail.com', '4476585e1256365bbf247e3e7becd4938b7f751e', '890127R', 0, 0, '2024-09-13 13:19:15', NULL),
(19, 'Brandon Ross', 'brandon.ross@gmail.com', '4476585e1256365bbf247e3e7becd4938b7f751e', '901238S', 0, 0, '2024-09-13 13:19:15', NULL),
(20, 'Emma Gray', 'emma.gray@yahoo.com', '4476585e1256365bbf247e3e7becd4938b7f751e', '012349T', 0, 0, '2024-09-13 13:19:15', NULL),
(21, 'Lódri Geroge', 'george@gmail.com', 'a93cdd134f322b08944fab09b7941b6a16d35cee', '199956A', 0, 0, '2025-01-09 12:49:28', NULL),
(22, 'Lódri G', 'lodri@gmail.com', 'a93cdd134f322b08944fab09b7941b6a16d35cee', '176453P', 0, 0, '2025-01-09 13:18:51', NULL),
(27, 'Alma', 'alma@gmail.com', 'a93cdd134f322b08944fab09b7941b6a16d35cee', '122956A', 0, 0, '2025-02-27 09:54:39', NULL),
(32, 'newuser', 'neoxevil@gmail.com', 'a93cdd134f322b08944fab09b7941b6a16d35cee', '435678A', 0, 1, '2025-03-04 15:38:28', NULL),
(34, 'Lódri sadasdasderoge', 'georgeeeeee@gmail.com', 'a93cdd134f322b08944fab09b7941b6a16d35cee', '191256A', 0, 0, '2025-04-15 11:22:37', NULL),
(35, 'Lódri saddasderoge', 'georgeeee@gmail.com', 'a93cdd134f322b08944fab09b7941b6a16d35cee', '191222A', 0, 0, '2025-04-15 11:26:15', NULL),
(36, 'dasdsdsa', 'sadsadsa@gmail.com', 'a93cdd134f322b08944fab09b7941b6a16d35cee', '861234PE', 1, 0, '2025-04-15 11:27:08', NULL),
(37, 'adsadsa', 'asdsss@gmail.com', 'a93cdd134f322b08944fab09b7941b6a16d35cee', '827384PE', 1, 0, '2025-04-15 11:27:51', NULL),
(38, 'John Doe', 'asdd@gmail.com', 'a93cdd134f322b08944fab09b7941b6a16d35cee', '128723P', 1, 0, '2025-04-15 11:28:59', NULL),
(39, 'asd', 'adsss@gmail.com', 'a93cdd134f322b08944fab09b7941b6a16d35cee', '982642PE', 0, 0, '2025-04-15 11:30:13', NULL),
(40, 'Lódri hiiiiiiii', 'ihiahdihai@gmail.com', 'a93cdd134f322b08944fab09b7941b6a16d35cee', '196622A', 0, 1, '2025-04-15 11:32:25', NULL),
(41, 'Lódri hiiiii', 'ooooooo@gmail.com', 'a93cdd134f322b08944fab09b7941b6a16d35cee', '196772A', 0, 0, '2025-04-15 11:34:14', NULL),
(42, 'Lódri hiiiidsdsi', 'aaaaaaaaaaaaaa@gmail.com', 'a93cdd134f322b08944fab09b7941b6a16d35cee', '191172A', 1, 0, '2025-04-15 11:40:54', NULL),
(43, 'korte', 'korte@gmail.com', 'a93cdd134f322b08944fab09b7941b6a16d35cee', '491823K', 1, 0, '2025-04-19 09:52:08', NULL);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `booking_x_car_extras`
--
ALTER TABLE `booking_x_car_extras`
  ADD PRIMARY KEY (`id`),
  ADD KEY `B_CE_FK` (`booking_id`);

--
-- A tábla indexei `cars`
--
ALTER TABLE `cars`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `license_plate` (`license_plate`);

--
-- A tábla indexei `car_availability`
--
ALTER TABLE `car_availability`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `car_extras`
--
ALTER TABLE `car_extras`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `car_service`
--
ALTER TABLE `car_service`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `personal_id` (`personal_id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT a táblához `booking_x_car_extras`
--
ALTER TABLE `booking_x_car_extras`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `cars`
--
ALTER TABLE `cars`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=124;

--
-- AUTO_INCREMENT a táblához `car_availability`
--
ALTER TABLE `car_availability`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT a táblához `car_extras`
--
ALTER TABLE `car_extras`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT a táblához `car_service`
--
ALTER TABLE `car_service`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT a táblához `login`
--
ALTER TABLE `login`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT a táblához `payment`
--
ALTER TABLE `payment`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `booking_x_car_extras`
--
ALTER TABLE `booking_x_car_extras`
  ADD CONSTRAINT `B_CE_FK` FOREIGN KEY (`booking_id`) REFERENCES `booking_x_car_extras` (`id`) ON DELETE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
