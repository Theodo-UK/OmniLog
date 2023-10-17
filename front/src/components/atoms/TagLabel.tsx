import { TagData } from "@/types/logDisplayOptions";

export const TagLabel = ({ tag }: { tag: TagData }) => {
    return (
        <div className="text-sm text-gray-800 rounded-md px-2 py-1 m-1 outline outline-gray-500 bg-white truncate">
            {tag.name}
        </div>
    );
};
