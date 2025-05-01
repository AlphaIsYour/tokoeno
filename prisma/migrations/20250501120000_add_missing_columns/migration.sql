-- Add missing columns to User table
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "password" TEXT;