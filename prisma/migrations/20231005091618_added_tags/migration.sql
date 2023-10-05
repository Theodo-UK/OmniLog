-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TagTollmLogs" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_TagTollmLogs_AB_unique" ON "_TagTollmLogs"("A", "B");

-- CreateIndex
CREATE INDEX "_TagTollmLogs_B_index" ON "_TagTollmLogs"("B");

-- AddForeignKey
ALTER TABLE "_TagTollmLogs" ADD CONSTRAINT "_TagTollmLogs_A_fkey" FOREIGN KEY ("A") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TagTollmLogs" ADD CONSTRAINT "_TagTollmLogs_B_fkey" FOREIGN KEY ("B") REFERENCES "llmLogs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
