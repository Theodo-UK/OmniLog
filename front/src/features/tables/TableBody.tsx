import { llm_logs } from "@prisma/client";
import EmptyLogs from "./EmptyLogs";
import LogsTable from "./LogsTable";

export const TableBody = ({ logs }: { logs: llm_logs[] }) => {
    return logs.length === 0 ? <EmptyLogs /> : <LogsTable logs={logs} />;
};
