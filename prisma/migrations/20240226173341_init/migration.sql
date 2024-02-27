/*
  Warnings:

  - You are about to drop the column `createdAt` on the `voca` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `voca` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `voca` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;
