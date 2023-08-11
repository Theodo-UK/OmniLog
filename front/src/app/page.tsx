import { Scaffold } from "../atomic/molecules/Scaffold";
import { LogsData } from "../data/LogsData";
import LogsTable from "./LogsTable";

export default async function Home() {
    const logs = await LogsData.getLogs();
    return (
        <Scaffold>
            <LogsTable logs={logs} />
        </Scaffold>
    );
}
