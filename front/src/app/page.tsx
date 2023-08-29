import { FilterHeader } from "@/features/LogFilter/FilterHeader";
import EmptyLogs from "../features/LogTables/EmptyLogs";
import LogsTable from "../features/LogTables/LogsTable";
import { LogsData } from "../services/LogsData";

export const revalidate = 0;

export default async function Home({
    searchParams,
}: {
    searchParams?: URLSearchParams;
}) {
    const logs = await LogsData.getLogs(searchParams);

    return (
        <>
            <FilterHeader />
            {logs.length === 0 ? <EmptyLogs /> : <LogsTable logs={logs} />}
        </>
    );
}
