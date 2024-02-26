-- DropForeignKey
ALTER TABLE `meaning` DROP FOREIGN KEY `Meaning_vocaId_fkey`;

-- AddForeignKey
ALTER TABLE `Meaning` ADD CONSTRAINT `Meaning_vocaId_fkey` FOREIGN KEY (`vocaId`) REFERENCES `Voca`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
