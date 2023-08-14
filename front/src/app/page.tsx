import { LogsData } from "../data/LogsData";
import LogsTable from "./LogsTable";

export default async function Home() {
    const logs = await LogsData.getLogs();
    return <LogsTable logs={logs} />;
}
