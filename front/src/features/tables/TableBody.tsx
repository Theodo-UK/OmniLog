import { LogDataArray } from "@/types/logDisplayOptions";
import EmptyLogs from "./EmptyLogs";
import LogsTable from "./LogsTable";

export const TableBody = ({ logs }: { logs: LogDataArray }) => {
    return logs.length === 0 ? <EmptyLogs /> : <LogsTable logs={logs} />;
};
