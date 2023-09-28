import { useNavigation } from "@/hooks/useNavigation";
import { SortOptions } from "@/types/logDisplayOptions";
import { SortIcon } from "./SortIcon";

type ColumnHeaderProps = {
    title: string;
    sortKey?: SortOptions;
    width?: "small" | "medium" | "large";
};

export const ColumnHeader = ({ title, sortKey, width }: ColumnHeaderProps) => {
    const { sortBy, sortOrder, updateSearchParam } = useNavigation();
    let order: string | undefined = undefined;
    if (sortBy === sortKey) {
        order = sortOrder;
    }

    const updateSort = (key: SortOptions) => {
        const newOrder =
            order === undefined || order === "asc" ? "desc" : "asc";
        updateSearchParam({ sortBy: key, sortOrder: newOrder });
    };

    let thClass = "px-4 py-2 text-left text-gray-600 border-gray-300 border-x";
    switch (width) {
        case "small":
            thClass += " w-1/6";
            break;
        case "medium":
            thClass += " w-1/4";
            break;
    }

    return (
        <th className={thClass}>
            {sortKey ? (
                <div
                    className="flex gap-2 cursor-pointer items-center justify-between"
                    onClick={() => updateSort(sortKey)}
                >
                    {title}
                    <SortIcon order={order} />
                </div>
            ) : (
                <>{title}</>
            )}
        </th>
    );
};
