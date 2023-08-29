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
        router.push(`?${params.toString()}`);
    };
    return { router, searchParams, updateSearchParam };
};
