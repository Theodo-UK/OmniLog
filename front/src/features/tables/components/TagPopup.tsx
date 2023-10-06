import { Button } from "@/components/atoms/Button";
import { ButtonIcon } from "@/components/atoms/ButtonIcon";
import { Popup } from "@/components/atoms/Popup";
import { TagLabel } from "@/components/atoms/TagLabel";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useTagPopup } from "../hooks/useTagPopup";

export const TagPopup = ({ logId }: { logId: string }) => {
    const { isPopupOpen, setIsPopupOpen, tags, selectTag } = useTagPopup(logId);

    return (
        <>
            <ButtonIcon onClick={() => setIsPopupOpen(true)} icon={faPlus} />
            <Popup open={isPopupOpen}>
                <div className="bg-white items-stretch sm:items-start text-center">
                    <h3 className="text-base font-bold leading-6 text-gray-900 my-2">
                        Pick a tag to add
                    </h3>
                    <div className=" w-full mt-6 p-2 outline outline-gray-500 rounded-md px-4 py-2 flex flex-wrap items-center gap-1">
                        {tags.map((tag) => (
                            <button
                                key={tag.id}
                                onClick={() => {
                                    selectTag(tag.id);
                                }}
                            >
                                <TagLabel tag={tag} />
                            </button>
                        ))}
                    </div>
                </div>
                <div className="gap-2 flex">
                    <Button colour="red" onClick={() => setIsPopupOpen(false)}>
                        Exit
                    </Button>
                </div>
            </Popup>
        </>
    );
};
