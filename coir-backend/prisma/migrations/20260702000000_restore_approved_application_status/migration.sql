-- Restore the APPROVED enum value used by final approval.
ALTER TYPE "ApplicationStatus" ADD VALUE IF NOT EXISTS 'APPROVED';
