"use client";
import { CardAtom } from "@/components/atoms/CardAtom";
import { SearchBar } from "./SearchBar";
import { TimeDropdown } from "./TimeDropdown";

export const FilterHeader = () => {
    return (
        <CardAtom>
            <div className="flex gap-4">
                <SearchBar />
                <TimeDropdown />
            </div>
        </CardAtom>
    );
};
