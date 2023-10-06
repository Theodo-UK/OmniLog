import { LogDetailsTable } from "@/features/tables/views/LogDetailsTable";
import { LogsData } from "@/services/LogsData";

export default async function LogDetails({
    params,
}: {
    params: { id: string };
}) {
    const logDetails = await LogsData.getLogDetails(params.id);

    return <LogDetailsTable logDetails={logDetails} />;
}
