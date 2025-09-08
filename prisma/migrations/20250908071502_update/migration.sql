/*
  Warnings:

  - Added the required column `infoButton` to the `Match` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Match" ADD COLUMN     "infoButton" TEXT NOT NULL;
