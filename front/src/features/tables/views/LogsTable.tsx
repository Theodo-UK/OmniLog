"use client";
import { CardAtom } from "@/components/atoms/CardAtom";
import { ColumnHeader } from "@/features/tables/components/ColumnHeader";
import { useNavigation } from "@/hooks/useNavigation";
import { LogDataArray } from "@/types/logDisplayOptions";
import { ColumnContent } from "../components/ColumnContent";
import { ColumnContentTags } from "../components/ColumnContentTags";
import { formatCostToString } from "../helpers/formatCost";

export default function LogsTable({ logs }: { logs: LogDataArray }) {
    const { router } = useNavigation();

    return (
        <CardAtom>
            <table className="table-fixed w-full">
                <thead>
                    <tr className="bg-gray-100">
                        <ColumnHeader title={"ID"} width={"small"} />
                        <ColumnHeader
                            title={"Date"}
                            sortKey={"datetime_utc"}
                            width={"medium"}
                        />
                        <ColumnHeader title={"Input String"} />
                        <ColumnHeader title={"Output String"} />
                        <ColumnHeader
                            title={"Total Tokens"}
                            sortKey={"total_tokens"}
                            width={"small"}
                        />
                        <ColumnHeader
                            title={"Estimated cost (USD)"}
                            sortKey={"cost"}
                            width={"small"}
                        />
                        <ColumnHeader title={"Tags"} width={"medium"} />
                    </tr>
                </thead>
                <tbody>
                    {logs.map((log) => (
                        <tr
                            key={log.id}
                            className="hover:bg-gray-200 cursor-pointer"
                            onClick={() => router.push(`/logs/${log.id}`)}
                        >
                            <ColumnContent content={log.id} />
                            <ColumnContent
                                content={new Date(
                                    log.datetime_utc,
                                ).toLocaleString("en-GB")}
                            />
                            <ColumnContent content={log.input_string} />
                            <ColumnContent content={log.output_string} />
                            <ColumnContent
                                content={log.total_tokens.toString()}
                            />
                            <ColumnContent
                                content={formatCostToString(log.cost)}
                                tooltip={
                                    log.cost?.toString() ??
                                    "undefined: an error occurred"
                                }
                            />
                            <ColumnContentTags tags={log.tags} logId={log.id} />
                        </tr>
                    ))}
                </tbody>
            </table>
        </CardAtom>
    );
}
