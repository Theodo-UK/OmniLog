import { TagsAPI } from "@/services/nextAPI/TagsAPI";
import { Tag } from "@prisma/client";
import { useEffect, useState } from "react";

export const useTagPopup = (logId: string) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [tags, setTags] = useState<Tag[]>([]);

    useEffect(() => {
        TagsAPI.getTags().then((tags) => setTags(tags));
    }, []);

    const selectTag = (tagId: string) => {
        TagsAPI.connectTagToLog(logId, tagId);
        setIsPopupOpen(false);
    };

    return { isPopupOpen, setIsPopupOpen, tags, selectTag };
};
