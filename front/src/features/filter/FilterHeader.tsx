"use client";
import { CardAtom } from "@/components/atoms/CardAtom";
import { TextInput } from "@/components/atoms/TextInput";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TimeDropdown } from "./TimeDropdown";

export const FilterHeader = () => {
    return (
        <CardAtom>
            <div className="flex gap-4">
                <TextInput
                    placeholder="Search"
                    icon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
                />
                <TimeDropdown />
            </div>
        </CardAtom>
    );
};
