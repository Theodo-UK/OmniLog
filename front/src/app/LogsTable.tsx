"use client";
import { CardAtom } from "@/atomic/atoms/CardAtom";
import { useNavigation } from "@/hooks/useNavigation";
import { llm_logs } from "@prisma/client";

type Props = {
    logs: llm_logs[];
};
export default function LogsTable({ logs }: Props) {
    const { router, searchParams, updateSearchParam } = useNavigation();
    const sortBy = (key: keyof llm_logs) => () => {
        const order = searchParams.get("sortOrder") === "asc" ? "desc" : "asc";
        updateSearchParam("sortBy", key, "sortOrder", order);
    };

    return (
        <CardAtom>
            <table className="table-fixed w-full">
                <thead>
                    <tr className="bg-gray-100">
                        <th
                            className="px-4 py-2 text-left text-gray-600 w-1/12"
                            onClick={() => sortBy("id")}
                        >
                            ID
                        </th>
                        <th
                            className="px-4 py-2 text-left text-gray-600 w-1/6"
                            onClick={sortBy("datetime_utc")}
                        >
                            Date/Time (UTC)
                        </th>
                        <th className="px-4 py-2 text-left text-gray-600">
                            Input String
                        </th>
                        <th className="px-4 py-2 text-left text-gray-600">
                            Output String
                        </th>
                        <th
                            className="px-4 py-2 text-left text-gray-600  w-1/12"
                            onClick={sortBy("total_tokens")}
                        >
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
