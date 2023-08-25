"use client";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CardAtom } from "../atoms/CardAtom";
import { TextInput } from "../atoms/TextInput";
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
