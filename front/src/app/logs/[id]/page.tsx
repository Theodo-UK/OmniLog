import { LogsData } from "@/data/LogsData";
import { LogDetailsTable } from "@/features/LogTables/LogDetailsTable";

export default async function LogDetails({
    params,
}: {
    params: { id: string };
}) {
    const logDetails = await LogsData.getLogDetails(params.id);

    return <LogDetailsTable logDetails={logDetails} />;
}
