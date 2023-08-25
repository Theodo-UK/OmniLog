import { FilterHeader } from "@/atomic/molecules/FilterHeader";
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

    return (
        <div className="flex flex-col gap-4 w-full">
            <FilterHeader />
            {logs.length === 0 ? <EmptyLogs /> : <LogsTable logs={logs} />}
        </div>
    );
}
