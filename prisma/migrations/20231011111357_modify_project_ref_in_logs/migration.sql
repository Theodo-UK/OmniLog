/*
  Warnings:

  - You are about to drop the column `projectId` on the `llmLogs` table. All the data in the column will be lost.
  - Added the required column `projectName` to the `llmLogs` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "llmLogs" DROP CONSTRAINT "llmLogs_projectId_fkey";

-- AlterTable
ALTER TABLE "llmLogs" DROP COLUMN "projectId",
ADD COLUMN     "projectName" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "llmLogs" ADD CONSTRAINT "llmLogs_projectName_fkey" FOREIGN KEY ("projectName") REFERENCES "Project"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
