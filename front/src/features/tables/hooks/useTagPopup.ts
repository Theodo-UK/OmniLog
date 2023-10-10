import { LogsAPI } from "@/services/nextAPI/LogsAPI";
import { TagsAPI } from "@/services/nextAPI/TagsAPI";
import { Tag } from "@prisma/client";
import { MouseEventHandler, useEffect, useState } from "react";
import { findTagById } from "../helpers/tagArrayManagement";

export const useTagPopup = (
    logId: string,
    addTagToDisplay: (tag: Tag) => void,
) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [tags, setTags] = useState<Tag[]>([]);

    useEffect(() => {
        TagsAPI.getTags().then((tags) => setTags(tags));
    }, []);

    const selectTag = async (tagId: string) => {
        const tag = findTagById(tags, tagId);
        const success = await LogsAPI.connectTagToLog(logId, tagId);
        if (success) {
            addTagToDisplay(tag);
            setIsPopupOpen(false);
        } else {
            alert("Failed to connect tag to log.");
        }
    };

    const openPopup: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation(); // Prevents the click event from bubbling up to the table row
        setIsPopupOpen(true);
    };

    return { isPopupOpen, openPopup, setIsPopupOpen, tags, selectTag };
};
