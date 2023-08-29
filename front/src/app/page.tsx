import { FilterHeader } from "@/features/filter/FilterHeader";
import { TableBody } from "@/features/tables/TableBody";
import { LogsData } from "@/services/LogsData";

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
            <TableBody logs={logs} />
        </>
    );
}
