/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `Scheme` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `Scheme` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Scheme" ADD COLUMN     "code" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Scheme_code_key" ON "Scheme"("code");
