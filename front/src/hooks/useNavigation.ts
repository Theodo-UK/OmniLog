import { useRouter, useSearchParams } from "next/navigation";

export const useNavigation = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const updateSearchParam = (
        key1: "sortBy" | "dateTimeFilter",
        value1: string,
        key2?: "sortOrder",
        value2?: string,
    ) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set(key1, value1);
        if (key2 && value2) params.set(key2, value2);
        router.push(`?${params.toString()}`);
    };
    return { router, searchParams, updateSearchParam };
};
