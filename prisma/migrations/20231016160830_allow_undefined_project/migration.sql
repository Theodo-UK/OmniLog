-- DropForeignKey
ALTER TABLE "llmLogs" DROP CONSTRAINT "llmLogs_projectId_fkey";

-- AlterTable
ALTER TABLE "llmLogs" ALTER COLUMN "projectId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "llmLogs" ADD CONSTRAINT "llmLogs_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;
