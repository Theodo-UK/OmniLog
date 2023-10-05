import { Tag } from "@prisma/client";
import { TagLabel } from "../../../components/atoms/TagLabel";

export const ColumnContentTags = ({ tags }: { tags: Tag[] }) => {
    return (
        <td className="px-4 py-2 flex flex-wrap">
            {tags.map((tag) => (
                <TagLabel key={tag.id} tag={tag} />
            ))}
        </td>
    );
};
