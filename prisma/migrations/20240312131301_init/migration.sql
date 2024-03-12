/*
  Warnings:

  - The primary key for the `wordbook` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `wordbook` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[uuid]` on the table `Wordbook` will be added. If there are existing duplicate values, this will fail.
  - The required column `uuid` was added to the `Wordbook` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE `voca` DROP FOREIGN KEY `Voca_wordbookId_fkey`;

-- AlterTable
ALTER TABLE `voca` MODIFY `wordbookId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `wordbook` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `uuid` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`uuid`);

-- CreateIndex
CREATE UNIQUE INDEX `Wordbook_uuid_key` ON `Wordbook`(`uuid`);

-- AddForeignKey
ALTER TABLE `Voca` ADD CONSTRAINT `Voca_wordbookId_fkey` FOREIGN KEY (`wordbookId`) REFERENCES `Wordbook`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;
