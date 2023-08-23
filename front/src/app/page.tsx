import { LogsData } from "../data/LogsData";
import EmptyLogs from "./EmptyLogs";
import LogsTable from "./LogsTable";

export const revalidate = 0;

export default async function Home() {
    const logs = await LogsData.getLogs();

    if (logs.length === 0) {
        return <EmptyLogs />;
    }

    return <LogsTable logs={logs} />;
}
