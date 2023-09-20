-- CreateTable
CREATE TABLE "llm_logs" (
    "id" TEXT NOT NULL,
    "datetime_utc" TIMESTAMP(3) NOT NULL,
    "input_string" TEXT NOT NULL,
    "output_string" TEXT NOT NULL,
    "total_tokens" INTEGER NOT NULL,

    CONSTRAINT "llm_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "omnilog_user" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "omnilog_user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "omnilog_user_email_key" ON "omnilog_user"("email");
