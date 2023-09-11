import { LogDisplayOptions, timeOptionArry } from "@/types/logDisplayOptions";
import { useRouter, useSearchParams } from "next/navigation";

export const useNavigation = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const updateSearchParam = (FilterBy: LogDisplayOptions) => {
        const params = new URLSearchParams(searchParams.toString());
        for (const [key, value] of Object.entries(FilterBy)) {
            params.set(key, value);
        }
        if (timeOptionArry.includes(params.get("dateTimeFilter") ?? "")) {
            params.delete("startDateTime");
            params.delete("endDateTime");
        }
        else {
            params.delete("dateTimeFilter");
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
