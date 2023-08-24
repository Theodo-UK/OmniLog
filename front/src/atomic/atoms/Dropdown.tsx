"use client";
import { faCalendarDays, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Listbox, Transition } from "@headlessui/react";
import { Fragment } from "react";

type DropdownProps = {
    options: string[];
    selected: string;
    onSelect: (value: string) => void;
};

export const Dropdown = ({ options, selected, onSelect }: DropdownProps) => {
    return (
        <Listbox value={selected} onChange={onSelect}>
            <div className="relative w-full">
                <Listbox.Button className="relative w-full border-2 border-gray-300 rounded-lg bg-white h-10 py-2 pl-3 pr-10 text-left hover:bg-gray-100 focus:border-theodo-blue focus:outline-none focus-visible:border-theodo-blue focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-theodo-grey sm:text-sm">
                    <span className="block truncate text-base">{selected}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-theodo-dark-blue">
                        <FontAwesomeIcon icon={faCalendarDays} />
                    </span>
                </Listbox.Button>
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {options.map((option, optionIdx) => (
                            <Listbox.Option
                                key={optionIdx}
                                className="relative cursor-default select-none py-2 pl-10 pr-4 text-gray-900 hover:bg-theodo-grey"
                                value={option}
                            >
                                <span
                                    className={`block truncate ${
                                        option === selected
                                            ? "font-medium"
                                            : "font-normal"
                                    }`}
                                >
                                    {option}
                                </span>
                                {option === selected ? (
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-theodo-dark-blue">
                                        <FontAwesomeIcon icon={faCheck} />
                                    </span>
                                ) : null}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </Transition>
            </div>
        </Listbox>
    );
};
