import { LogsData } from "../data/LogsData";
import EmptyLogs from "./EmptyLogs";
import LogsTable from "./LogsTable";

export const revalidate = 0;

export default async function Home({
    searchParams,
}: {
    searchParams?: { [key: string]: string | string[] | undefined };
}) {
    const selectedTime = searchParams?.dateTimeFilter?.toString();
    const logs = await LogsData.getLogs(selectedTime || "Last hour");

    if (logs.length === 0) {
        return <EmptyLogs />;
    }

    return <LogsTable logs={logs} />;
}
