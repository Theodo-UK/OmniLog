import { CardAtom } from "@/atomic/atoms";
import { LogsData } from "@/data/LogsData";

export default async function LogDetails({
    params,
}: {
    params: { id: string };
}) {
    const logDetails = await LogsData.getLogDetails(params.id);

    return (
        <CardAtom>
            <table className="table-auto w-full">
                <tbody>
                    <tr>
                        <td className="font-bold px-4 py-2">ID:</td>
                        <td className="px-4 py-2">{logDetails.id}</td>
                    </tr>
                    <tr>
                        <td className="font-bold px-4 py-2">
                            Date/Time (UTC):
                        </td>
                        <td className="px-4 py-2">
                            {new Date(logDetails.datetime_utc).toLocaleString()}
                        </td>
                    </tr>
                    <tr>
                        <td className="font-bold px-4 py-2">Input String:</td>
                        <td className="px-4 py-2">{logDetails.input_string}</td>
                    </tr>
                    <tr>
                        <td className="font-bold px-4 py-2">Output String:</td>
                        <td className="px-4 py-2">
                            {logDetails.output_string}
                        </td>
                    </tr>
                    <tr>
                        <td className="font-bold px-4 py-2">Total Tokens:</td>
                        <td className="px-4 py-2">{logDetails.total_tokens}</td>
                    </tr>
                </tbody>
            </table>
        </CardAtom>
    );
}
