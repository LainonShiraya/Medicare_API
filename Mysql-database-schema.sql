-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: tin-database
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `appointment`
--
CREATE DATABASE MedicareDatabase

USE MedicareDatabase

DROP TABLE IF EXISTS `appointment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appointment` (
  `Id_appointment` int NOT NULL AUTO_INCREMENT,
  `Description` text,
  `Doctor_Id_doctor` int NOT NULL,
  `Patient_Id_patient` int NOT NULL,
  `Visit_date` varchar(255) DEFAULT NULL,
  `Title` varchar(255) DEFAULT NULL,
  `Hour` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id_appointment`),
  KEY `Badanie_Lekarz` (`Doctor_Id_doctor`),
  KEY `Badanie_Pacjent` (`Patient_Id_patient`),
  CONSTRAINT `Badanie_Lekarz` FOREIGN KEY (`Doctor_Id_doctor`) REFERENCES `doctor` (`Id_doctor`) ON DELETE CASCADE,
  CONSTRAINT `Badanie_Pacjent` FOREIGN KEY (`Patient_Id_patient`) REFERENCES `patient` (`Id_patient`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=999700 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointment`
--

LOCK TABLES `appointment` WRITE;
/*!40000 ALTER TABLE `appointment` DISABLE KEYS */;
INSERT INTO `appointment` VALUES (999699,'Test',1234,1,'2022-10-12','Test','11:30');
/*!40000 ALTER TABLE `appointment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctor`
--

DROP TABLE IF EXISTS `doctor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctor` (
  `Id_doctor` int NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Last_name` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Role` varchar(255) NOT NULL,
  PRIMARY KEY (`Id_doctor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctor`
--

LOCK TABLES `doctor` WRITE;
/*!40000 ALTER TABLE `doctor` DISABLE KEYS */;
INSERT INTO `doctor` VALUES (1234,'John','Doe','$2a$08$1NSN3VqPVQ7t4maQ9Mpiq.2zT4epk/kDUyy8IUC7GjIFSwMwf4ZbS','Admin');
/*!40000 ALTER TABLE `doctor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patient`
--

DROP TABLE IF EXISTS `patient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patient` (
  `Id_patient` int NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Last_name` varchar(100) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Gender` varchar(255) NOT NULL DEFAULT 'unknown',
  `Blood_type` varchar(255) NOT NULL DEFAULT 'unknown',
  `Allergies` varchar(255) DEFAULT 'Not Defined',
  `Diseases` varchar(255) DEFAULT 'Not Defined',
  `Height` int DEFAULT '0',
  `Weight` int DEFAULT '0',
  `Last_visit` varchar(255) DEFAULT NULL,
  `Password` varchar(255) DEFAULT NULL,
  `Role` varchar(255) DEFAULT 'patient',
  PRIMARY KEY (`Id_patient`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient`
--

LOCK TABLES `patient` WRITE;
/*!40000 ALTER TABLE `patient` DISABLE KEYS */;
INSERT INTO `patient` VALUES (0,'0','0','0','0','0','0','0',0,0,NULL,NULL,'patient'),(1,'Jakub','Abacki','abacki@abacki.com','Male','AB0','futro','podwyzszone cisnie',180,80,'0000/00/00',NULL,'patient'),(2,'TestUser','TestUser','testmail@gmail.com','unknown','unknown','Not Defined','Not Defined',0,0,NULL,'$2a$08$1NSN3VqPVQ7t4maQ9Mpiq.2zT4epk/kDUyy8IUC7GjIFSwMwf4ZbS','patient'),(4,'GrzegorzEduoytowany','Kowalski','grzegorz@kowalski.com','Male','AB0','pyłki','cukrzyca',177,69,NULL,NULL,'patient'),(108,'Test','Test','Test@gmail.com','Male','Arh0','oijoij','ijoij',80,180,'',NULL,'patient'),(1000,'ad','ad','@gmail','unknown','unknown','Not Defined','Not Defined',0,0,NULL,NULL,'patient'),(1432,'gdsg','gfdsgf','gdfs@gmail.com','unknown','unknown','Not Defined','Not Defined',0,0,NULL,'$2a$08$ygh4WIbU8Y8A5QDI96N2Iecx8F8lYOgMgoiH/tPIY75AMh1F4Zime','patient'),(2137,'Test','Test','Test@gmail.com','Female','Arh-','opium','opium',178,180,'',NULL,'patient'),(9990,'jpijpi','jpoij','poijpoij@gmail.com','','','','',10,0,'',NULL,'patient'),(11111,'pokpok','pokpok','pokpok','','','','',0,0,'',NULL,'patient'),(21321,'saf','fdsa','fsda@gmail.com','unknown','unknown','Not Defined','Not Defined',0,0,NULL,'$2a$08$ygh4WIbU8Y8A5QDI96N2Iecx8F8lYOgMgoiH/tPIY75AMh1F4Zime','patient'),(36436,'fdhfd','hfgdhgd','opkokp@gmail.com','','','','',0,0,'','$2a$08$DI7nZdAJcrQkRWrH8EhS2uNFv/C4H/DQRMFzIZ9zJPp3qRxTKabhG','patient');
/*!40000 ALTER TABLE `patient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prescription`
--

DROP TABLE IF EXISTS `prescription`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prescription` (
  `Id_prescription` int NOT NULL AUTO_INCREMENT,
  `Description` text,
  `Title` varchar(255) DEFAULT NULL,
  `Expiration_date` varchar(255) NOT NULL,
  `Appointment_date` varchar(255) NOT NULL,
  `Doctor_Id_doctor` int NOT NULL,
  `Patient_Id_patient` int NOT NULL,
  PRIMARY KEY (`Id_prescription`),
  KEY `Recepta_Lekarz` (`Doctor_Id_doctor`),
  KEY `Recepta_Pacjent` (`Patient_Id_patient`),
  CONSTRAINT `Recepta_Lekarz` FOREIGN KEY (`Doctor_Id_doctor`) REFERENCES `doctor` (`Id_doctor`) ON DELETE CASCADE,
  CONSTRAINT `Recepta_Pacjent` FOREIGN KEY (`Patient_Id_patient`) REFERENCES `patient` (`Id_patient`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=236 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prescription`
--

LOCK TABLES `prescription` WRITE;
/*!40000 ALTER TABLE `prescription` DISABLE KEYS */;
INSERT INTO `prescription` VALUES (235,'dsads','adsa','23','2022-01-14',1234,1);
/*!40000 ALTER TABLE `prescription` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-01-30  0:52:14
