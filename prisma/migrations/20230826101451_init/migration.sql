-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'SELLER', 'USER');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "roles" "Role"[];
