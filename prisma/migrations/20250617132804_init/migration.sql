/*
  Warnings:

  - You are about to drop the column `deskripsi` on the `aset` table. All the data in the column will be lost.
  - You are about to drop the column `lokasi` on the `aset` table. All the data in the column will be lost.
  - You are about to drop the column `tanggal` on the `aset` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[serial]` on the table `Aset` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `aset` DROP COLUMN `deskripsi`,
    DROP COLUMN `lokasi`,
    DROP COLUMN `tanggal`,
    ADD COLUMN `kondisi` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `merek` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `serial` VARCHAR(191) NOT NULL DEFAULT '';

-- CreateTable
CREATE TABLE `Penyewa` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `kontak` VARCHAR(191) NOT NULL,
    `identitas` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transaksi` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `asetId` INTEGER NOT NULL,
    `penyewaId` INTEGER NOT NULL,
    `tanggalPinjam` DATETIME(3) NOT NULL,
    `tanggalKembali` DATETIME(3) NULL,
    `status` VARCHAR(191) NOT NULL,

    INDEX `Transaksi_asetId_idx`(`asetId`),
    INDEX `Transaksi_penyewaId_idx`(`penyewaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Aset_serial_key` ON `Aset`(`serial`);

-- AddForeignKey
ALTER TABLE `Transaksi` ADD CONSTRAINT `Transaksi_asetId_fkey` FOREIGN KEY (`asetId`) REFERENCES `Aset`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaksi` ADD CONSTRAINT `Transaksi_penyewaId_fkey` FOREIGN KEY (`penyewaId`) REFERENCES `Penyewa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
