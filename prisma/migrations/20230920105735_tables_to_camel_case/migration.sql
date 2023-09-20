-- AlterTable
ALTER TABLE "llmLogs" RENAME CONSTRAINT "llm_logs_pkey" TO "llmLogs_pkey";

-- AlterTable
ALTER TABLE "omnilogUser" RENAME CONSTRAINT "omnilog_user_pkey" TO "omnilogUser_pkey";

-- RenameIndex
ALTER INDEX "omnilog_user_email_key" RENAME TO "omnilogUser_email_key";
