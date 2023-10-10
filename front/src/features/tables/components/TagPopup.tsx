import { Button } from "@/components/atoms/Button";
import { ButtonIcon } from "@/components/atoms/ButtonIcon";
import { Popup } from "@/components/atoms/Popup";
import { TagLabel } from "@/components/atoms/TagLabel";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Tag } from "@prisma/client";
import { useTagPopup } from "../hooks/useTagPopup";

type TagPopupProps = {
    logId: string;
    addTagToDisplay: (tag: Tag) => void;
};

export const TagPopup = ({ logId, addTagToDisplay }: TagPopupProps) => {
    const { isPopupOpen, openPopup, setIsPopupOpen, tags, selectTag } =
        useTagPopup(logId, addTagToDisplay);

    return (
        <>
            <ButtonIcon onClick={openPopup} icon={faPlus} />
            <Popup open={isPopupOpen} setOpen={setIsPopupOpen}>
                <div className="bg-white items-stretch sm:items-start text-center">
                    <h2 className=" text-lg font-bold leading-6 text-gray-900 my-4">
                        Pick a tag to add
                    </h2>
                    <div className=" w-full my-6 p-2 outline outline-gray-500 bg-gray-50 rounded-md px-4 py-2 flex flex-wrap items-center gap-1">
                        {tags.map((tag) => (
                            <button
                                key={tag.id}
                                onClick={() => selectTag(tag.id)}
                            >
                                <TagLabel tag={tag} />
                            </button>
                        ))}
                    </div>
                </div>
                <div className="flex gap-4">
                    <Button
                        colour="red"
                        onClick={() => {
                            setIsPopupOpen(false);
                        }}
                    >
                        Cancel
                    </Button>
                    <Button colour="blue" onClick={() => {}}>
                        Useless Validation
                    </Button>
                </div>
            </Popup>
        </>
    );
};
