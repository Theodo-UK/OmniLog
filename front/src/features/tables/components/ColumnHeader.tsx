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

    const thClassSmall =
        "px-4 py-2 text-left text-gray-600 border-gray-300 border-x w-1/12";
    const thClassMedium =
        "px-4 py-2 text-left text-gray-600 border-gray-300 border-x w-1/6";
    let thClass = "px-4 py-2 text-left text-gray-600 border-gray-300 border-x";
    switch (width) {
        case "small":
            thClass = thClassSmall;
            break;
        case "medium":
            thClass = thClassMedium;
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
