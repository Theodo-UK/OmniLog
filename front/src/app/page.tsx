import { LogsData } from "../data/LogsData";
import Header from "./Header";
import LogsTable from "./LogsTable";

export default async function Home() {
    const logs = await LogsData.getLogs();
    return (
        <Header>
            <LogsTable logs={logs} />
        </Header>
    );
}
