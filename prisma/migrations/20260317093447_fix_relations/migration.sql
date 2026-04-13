/*
  Warnings:

  - You are about to drop the column `ipAddress` on the `IpRequest` table. All the data in the column will be lost.
  - You are about to drop the column `approvedBy` on the `WorkflowLog` table. All the data in the column will be lost.
  - The `action` column on the `WorkflowLog` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `role` column on the `WorkflowLog` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[ticketNo]` on the table `IpRequest` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `submittedByRole` to the `IpRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ticketNo` to the `IpRequest` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `currentRole` on the `IpRequest` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `stage` on the `WorkflowLog` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "WorkflowStage" AS ENUM ('NLDC', 'CISO', 'SOC', 'IT');

-- CreateEnum
CREATE TYPE "WorkflowAction" AS ENUM ('APPROVED', 'REJECTED', 'SENT_BACK', 'FORWARDED');

-- AlterEnum
ALTER TYPE "RequestStatus" ADD VALUE 'UNDER_NLDC_REVIEW';

-- AlterTable
ALTER TABLE "IpRequest" DROP COLUMN "ipAddress",
ADD COLUMN     "submittedByRole" "Role" NOT NULL,
ADD COLUMN     "ticketNo" TEXT NOT NULL,
DROP COLUMN "currentRole",
ADD COLUMN     "currentRole" "Role" NOT NULL;

-- AlterTable
ALTER TABLE "WorkflowLog" DROP COLUMN "approvedBy",
ADD COLUMN     "approvedById" TEXT,
DROP COLUMN "stage",
ADD COLUMN     "stage" "WorkflowStage" NOT NULL,
DROP COLUMN "action",
ADD COLUMN     "action" "WorkflowAction",
DROP COLUMN "role",
ADD COLUMN     "role" "Role";

-- CreateTable
CREATE TABLE "IpRequestIP" (
    "id" TEXT NOT NULL,
    "requestId" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "IpRequestIP_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "IpRequest_ticketNo_key" ON "IpRequest"("ticketNo");

-- AddForeignKey
ALTER TABLE "WorkflowLog" ADD CONSTRAINT "WorkflowLog_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IpRequestIP" ADD CONSTRAINT "IpRequestIP_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "IpRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
