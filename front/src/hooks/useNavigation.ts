import { LogDisplayOptions } from "@/types/logDisplayOptions";
import { useRouter, useSearchParams } from "next/navigation";

export const useNavigation = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const updateSearchParam = (FilterBy: LogDisplayOptions) => {
        const params = new URLSearchParams(searchParams.toString());
        for (const [key, value] of Object.entries(FilterBy)) {
            params.set(key, value);
        }
        if (params.get("dateTimeFilter") !== "Filter by time") {
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
    return { router, searchParams, updateSearchParam, removeSearchParam };
};
