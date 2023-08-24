"use client";
import { CardAtom, TextInput } from "@/atomic/atoms";
import { TimeDropdown } from "@/atomic/molecules/TimeDropdown";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { llm_logs } from "@prisma/client";
import { useRouter } from "next/navigation";

type Props = {
    logs: llm_logs[];
};
export default function LogsTable({ logs }: Props) {
    const router = useRouter();

    return (
        <CardAtom>
            <div className="flex gap-4">
                <TextInput
                    placeholder="Search"
                    icon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
                />
                <TimeDropdown />
            </div>
            <table className="table-fixed w-full">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-4 py-2 text-left text-gray-600 w-1/12">
                            ID
                        </th>
                        <th className="px-4 py-2 text-left text-gray-600 w-1/6">
                            Date/Time (UTC)
                        </th>
                        <th className="px-4 py-2 text-left text-gray-600">
                            Input String
                        </th>
                        <th className="px-4 py-2 text-left text-gray-600">
                            Output String
                        </th>
                        <th className="px-4 py-2 text-left text-gray-600  w-1/12">
                            Total Tokens
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {logs.map((log) => (
                        <tr
                            key={log.id}
                            className="hover:bg-gray-200 cursor-pointer"
                            onClick={() => router.push(`/logs/${log.id}`)}
                        >
                            <td className="px-4 py-2 text-gray-800">
                                {log.id}
                            </td>
                            <td className="px-4 py-2 text-gray-800">
                                {new Date(log.datetime_utc).toLocaleString(
                                    "en-GB",
                                )}
                            </td>
                            <td className="px-4 py-2 text-gray-800 truncate">
                                {log.input_string}
                            </td>
                            <td className="px-4 py-2 text-gray-800 truncate">
                                {log.output_string}
                            </td>
                            <td className="px-4 py-2 text-gray-800">
                                {log.total_tokens}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </CardAtom>
    );
}
