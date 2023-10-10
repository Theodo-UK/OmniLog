import { LogsAPI } from "@/services/nextAPI/LogsAPI";
import { TagsAPI } from "@/services/nextAPI/TagsAPI";
import { Tag } from "@prisma/client";
import { MouseEventHandler, useEffect, useState } from "react";

export const useTagPopup = (logId: string) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [tags, setTags] = useState<Tag[]>([]);

    useEffect(() => {
        TagsAPI.getTags().then((tags) => setTags(tags));
    }, []);

    const selectTag = (tagId: string) => {
        LogsAPI.connectTagToLog(logId, tagId);
        setIsPopupOpen(false);
    };

    const openPopup: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation(); // Prevents the click event from bubbling up to the table row
        setIsPopupOpen(true);
    };

    return { isPopupOpen, openPopup, setIsPopupOpen, tags, selectTag };
};
