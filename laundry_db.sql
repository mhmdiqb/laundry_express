-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 02, 2026 at 04:02 AM
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
-- Database: `laundry_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `pelanggan`
--

CREATE TABLE `pelanggan` (
  `id_pelanggan` int(11) NOT NULL,
  `nama` varchar(100) DEFAULT NULL,
  `nohp` varchar(20) DEFAULT NULL,
  `alamat` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `transaksi`
--

CREATE TABLE `transaksi` (
  `id` int(11) NOT NULL,
  `nama` varchar(100) DEFAULT NULL,
  `layanan` varchar(100) DEFAULT NULL,
  `berat` int(11) NOT NULL,
  `status` varchar(50) DEFAULT NULL,
  `harga` int(11) NOT NULL,
  `nohp` varchar(20) DEFAULT NULL,
  `tanggal_masuk` date DEFAULT NULL,
  `estimasi_selesai` date DEFAULT NULL,
  `jumlah_baju` int(11) DEFAULT 0,
  `jumlah_celana` int(11) DEFAULT 0,
  `jumlah_jaket` int(11) DEFAULT 0,
  `jumlah_kerudung` int(11) DEFAULT 0,
  `jumlah_koko` int(11) DEFAULT 0,
  `jumlah_handuk` int(11) DEFAULT 0,
  `jumlah_kemeja` int(11) DEFAULT 0,
  `jumlah_sarung` int(11) DEFAULT 0,
  `jumlah_gamis` int(11) DEFAULT 0,
  `jumlah_mukena` int(11) DEFAULT 0,
  `id_pelanggan` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transaksi`
--

INSERT INTO `transaksi` (`id`, `nama`, `layanan`, `berat`, `status`, `harga`, `nohp`, `tanggal_masuk`, `estimasi_selesai`, `jumlah_baju`, `jumlah_celana`, `jumlah_jaket`, `jumlah_kerudung`, `jumlah_koko`, `jumlah_handuk`, `jumlah_kemeja`, `jumlah_sarung`, `jumlah_gamis`, `jumlah_mukena`, `id_pelanggan`) VALUES
(4, 'herdi ', 'Express', 3, 'Selesai', 45000, '3132455', '2026-06-13', '2026-06-14', 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, NULL),
(5, 'toriq', 'Express', 4, 'Selesai', 60000, '4455666', '2026-06-13', '2026-06-14', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NULL),
(8, 'raga', 'Cuci Setrika', 6, 'Selesai', 42000, '085739490767', '2026-06-13', '2026-06-16', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NULL),
(10, 'afif', 'Express', 10, 'Diproses', 150000, '082476249988', '2026-06-16', '2026-06-17', 5, 2, 1, 1, 2, 1, 1, 2, 2, 3, NULL),
(12, 'nizam', 'Express', 50, 'Selesai', 750000, '087829393190', '2026-06-16', '2026-06-17', 4, 2, 3, 1, 3, 2, 1, 2, 4, 1, NULL),
(14, 'syafik', 'Express', 80, 'Selesai', 1200000, '085705402470', '2026-06-17', '2026-06-18', 2, 1, 1, 1, 11, 1, 1, 11, 1, 1, NULL),
(16, 'tireq', 'Cuci Kering', 90, 'Selesai', 630000, '083140933677', '2026-06-23', '2026-06-26', 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, NULL),
(17, 'Hauzan', 'Cuci Setrika', 1100, 'Selesai', 7700000, '1234567890', '2026-06-24', '2026-06-27', 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id_user` int(11) NOT NULL,
  `nama` varchar(100) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` enum('admin','kasir','pelanggan') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id_user`, `nama`, `username`, `password`, `role`) VALUES
(1, 'administrator', 'admin', '123', 'admin'),
(2, 'kasir_laundry', 'kasir', '123', 'kasir');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `pelanggan`
--
ALTER TABLE `pelanggan`
  ADD PRIMARY KEY (`id_pelanggan`);

--
-- Indexes for table `transaksi`
--
ALTER TABLE `transaksi`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `pelanggan`
--
ALTER TABLE `pelanggan`
  MODIFY `id_pelanggan` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `transaksi`
--
ALTER TABLE `transaksi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
