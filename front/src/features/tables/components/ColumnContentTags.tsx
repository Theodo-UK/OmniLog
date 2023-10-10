import { TagPopup } from "@/features/tables/components/TagPopup";
import { Tag } from "@prisma/client";
import { useState } from "react";
import { TagLabel } from "../../../components/atoms/TagLabel";
import { concatAndSortTags, isTagInArray } from "../helpers/tagArrayManagement";

export const ColumnContentTags = ({
    tags,
    logId,
}: {
    tags: Tag[];
    logId: string;
}) => {
    const [tagArray, setTagArray] = useState<Tag[]>(tags);
    const addTag = (tag: Tag) => {
        if (isTagInArray(tagArray, tag.id)) return;
        setTagArray(concatAndSortTags(tagArray, tag));
    };
    return (
        <td className="px-4 py-2 flex flex-wrap items-center gap-1">
            {tagArray
                .map((tag) => <TagLabel key={tag.id} tag={tag} />)
                .concat(
                    <TagPopup
                        key="plus-button"
                        logId={logId}
                        addTagToDisplay={addTag}
                    />,
                )}
        </td>
    );
};
