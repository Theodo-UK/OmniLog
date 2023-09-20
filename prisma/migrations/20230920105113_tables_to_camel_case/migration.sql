/*
This migration has been manually edited to rename the tables
to camelCase without losing any data.
*/

-- RenameTable
ALTER TABLE "llm_logs" RENAME TO "llmLogs";

-- RenameTable
ALTER TABLE "omnilog_user" RENAME TO "omnilogUser";
