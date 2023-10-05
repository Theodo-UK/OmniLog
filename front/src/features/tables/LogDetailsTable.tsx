"use client";
import { Button } from "@/components/atoms/Button";
import { CardAtom } from "@/components/atoms/CardAtom";
import { useNavigation } from "@/hooks/useNavigation";
import { LogData } from "@/types/logDisplayOptions";
import { ColumnContentTags } from "./components/ColumnContentTags";

export const LogDetailsTable = ({ logDetails }: { logDetails: LogData }) => {
    const cost_text: string =
        logDetails.cost !== null
            ? logDetails.cost?.toString()
            : "undefined: an error occurred";
    const { navigateBack } = useNavigation();
    return (
        <CardAtom>
            <div className=" grid grid-cols-3 my-2 mb-4">
                <div>
                    <Button onClick={navigateBack}>Back</Button>
                </div>
                <h1 className="text-2xl font-bold text-center">Log Details</h1>
            </div>
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
                    <tr>
                        <td className="font-bold px-4 py-2">
                            Estimated cost (USD)
                        </td>
                        <td className="px-4 py-2">{cost_text}</td>
                    </tr>
                    <tr>
                        <td className="font-bold px-4 py-2">Tags</td>
                        <ColumnContentTags tags={logDetails.tags} />
                    </tr>
                </tbody>
            </table>
        </CardAtom>
    );
};
