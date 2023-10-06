import { TagPopup } from "@/features/tables/components/TagPopup";
import { Tag } from "@prisma/client";
import { TagLabel } from "../../../components/atoms/TagLabel";

export const ColumnContentTags = ({
    tags,
    logId,
}: {
    tags: Tag[];
    logId: string;
}) => {
    return (
        <td className="px-4 py-2 flex flex-wrap items-center gap-1">
            {tags
                .map((tag) => <TagLabel key={tag.id} tag={tag} />)
                .concat(<TagPopup key="plus-button" logId={logId} />)}
        </td>
    );
};
