/*
  Warnings:

  - Added the required column `password` to the `AdminUser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AdminUser" ADD COLUMN     "password" TEXT NOT NULL;
