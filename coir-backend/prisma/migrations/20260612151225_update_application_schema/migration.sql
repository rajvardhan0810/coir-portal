-- AlterTable
ALTER TABLE "Application" ADD COLUMN     "currentStep" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "ApplicationDetail" ADD COLUMN     "declarationAcceptedAt" TIMESTAMP(3);
