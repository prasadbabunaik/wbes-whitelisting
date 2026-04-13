/*
  Warnings:

  - The values [SUBMITTED,RLDC_REVIEW,NLDC_REVIEW,CISO_APPROVAL,SOC_CLEARANCE,IT_IMPLEMENTATION] on the enum `RequestStatus` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `currentRole` to the `IpRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `IpRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "RequestStatus_new" AS ENUM ('CREATED', 'SENT_TO_CISO', 'SENT_TO_SOC', 'SOC_VERIFIED', 'CISO_APPROVED', 'SENT_TO_IT', 'WHITELISTED', 'COMPLETED', 'NEED_MORE_INFO', 'REJECTED');
ALTER TABLE "IpRequest" ALTER COLUMN "status" TYPE "RequestStatus_new" USING ("status"::text::"RequestStatus_new");
ALTER TYPE "RequestStatus" RENAME TO "RequestStatus_old";
ALTER TYPE "RequestStatus_new" RENAME TO "RequestStatus";
DROP TYPE "public"."RequestStatus_old";
COMMIT;

-- AlterTable
ALTER TABLE "IpRequest" ADD COLUMN     "contactPerson" TEXT,
ADD COLUMN     "currentRole" TEXT NOT NULL,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "entityName" TEXT,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "remarks" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "IpWhitelist" ADD COLUMN     "requestId" TEXT;

-- AlterTable
ALTER TABLE "WorkflowLog" ADD COLUMN     "action" TEXT,
ADD COLUMN     "role" TEXT;

-- AddForeignKey
ALTER TABLE "IpWhitelist" ADD CONSTRAINT "IpWhitelist_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "IpRequest"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkflowLog" ADD CONSTRAINT "WorkflowLog_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "IpRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
