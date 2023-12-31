import { LogDisplayOptions } from "@/types/logDisplayOptions";
import {
    safeCastToOrder,
    safeCastToSortOptions,
    safeCastToTimeOption,
} from "@/types/safeCast";
import { useRouter, useSearchParams } from "next/navigation";

export const useNavigation = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const dateTimeFilter: LogDisplayOptions["dateTimeFilter"] =
        safeCastToTimeOption(searchParams.get("dateTimeFilter"));

    const sortBy = safeCastToSortOptions(searchParams.get("sortBy"));
    const sortOrder = safeCastToOrder(searchParams.get("sortOrder"));
    const getStringParam = (key: string): string | undefined => {
        const value = searchParams.get(key);
        return value || undefined;
    };

    const updateSearchParam = (FilterBy: LogDisplayOptions) => {
        const params = new URLSearchParams(searchParams.toString());
        for (const [key, value] of Object.entries(FilterBy)) {
            params.set(key, value);
        }

        const isCustomInterval = FilterBy.endDateTime && FilterBy.startDateTime;
        const isDateTmeFilter = FilterBy.dateTimeFilter !== undefined;
        if (isCustomInterval) params.delete("dateTimeFilter");
        if (isDateTmeFilter) {
            params.delete("startDateTime");
            params.delete("endDateTime");
        }
        router.push(`?${params.toString()}`);
    };
    const removeSearchParam = (key: keyof LogDisplayOptions) => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete(key);
        router.push(`?${params.toString()}`);
    };
    const navigateBack = () => {
        router.back();
    };
    return {
        router,
        updateSearchParam,
        removeSearchParam,
        sortBy,
        sortOrder,
        dateTimeFilter,
        getStringParam,
        navigateBack,
    };
};
