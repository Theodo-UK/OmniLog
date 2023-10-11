import { Tag } from "@prisma/client";

export const TagLabel = ({ tag }: { tag: Tag }) => {
    return (
        <div className="text-sm text-gray-800 rounded-md px-2 py-1 m-1 outline outline-gray-500 bg-white truncate">
            {tag.name}
        </div>
    );
};
