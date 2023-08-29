import { FilterOptions } from "@/types/filter";
import { useRouter, useSearchParams } from "next/navigation";

export const useNavigation = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const updateSearchParam = (FilterBy: FilterOptions) => {
        const params = new URLSearchParams(searchParams.toString());
        for (const [key, value] of Object.entries(FilterBy)) {
            params.set(key, value);
        }
        router.push(`?${params.toString()}`);
    };
    return { router, searchParams, updateSearchParam };
};
