"use client";
import { CardAtom } from "@/atomic/atoms/CardAtom";
import { useNavigation } from "@/hooks/useNavigation";
import {
    faSort,
    faSortDown,
    faSortUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { llm_logs } from "@prisma/client";

type Props = {
    logs: llm_logs[];
};
export default function LogsTable({ logs }: Props) {
    const { router } = useNavigation();

    return (
        <CardAtom>
            <table className="table-fixed w-full">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-4 py-2 text-left text-gray-600 w-1/12 border-gray-300 border-x">
                            ID
                        </th>
                        <th className="px-4 py-2 text-left text-gray-600 w-1/6 border-gray-300 border-x">
                            <ClickableColHeader
                                title="Date"
                                sortKey="datetime_utc"
                            />
                        </th>
                        <th className="px-4 py-2 text-left text-gray-600 border-gray-300 border-x">
                            Input String
                        </th>
                        <th className="px-4 py-2 text-left text-gray-600 border-gray-300 border-x">
                            Output String
                        </th>
                        <th className="px-4 py-2 text-left text-gray-600  w-1/12 border-gray-300 border-x">
                            <ClickableColHeader
                                title="Total Tokens"
                                sortKey="total_tokens"
                            />
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

const ClickableColHeader = ({
    title,
    sortKey,
}: {
    title: string;
    sortKey: "datetime_utc" | "total_tokens" | "id";
}) => {
    const { searchParams, updateSearchParam } = useNavigation();
    let order: string | undefined = undefined;
    if (searchParams.get("sortBy") === sortKey) {
        order = searchParams.get("sortOrder") || undefined;
    }

    const sortBy = (key: keyof llm_logs) => {
        const newOrder =
            order === undefined || order === "asc" ? "desc" : "asc";
        updateSearchParam("sortBy", key, "sortOrder", newOrder);
    };
    return (
        <div
            className="flex gap-2 cursor-pointer items-center justify-between"
            onClick={() => sortBy(sortKey)}
        >
            {title}
            <SortIcon order={order} />
        </div>
    );
};

const SortIcon = ({ order }: { order: string | undefined }) => {
    if (order === "asc") {
        return <FontAwesomeIcon icon={faSortUp} />;
    }
    if (order === "desc") {
        return <FontAwesomeIcon icon={faSortDown} />;
    }
    return (
        <span className="text-gray-300">
            <FontAwesomeIcon icon={faSort} />
        </span>
    );
};
