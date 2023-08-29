import React from "react";

export const TextInput = ({
    placeholder = "",
    icon = "",
}: {
    placeholder: string;
    icon: React.ReactNode;
}) => {
    return (
        <div className="relative w-full">
            <input
                type="text"
                className="w-full border-2 border-gray-300 bg-white h-10 pl-3 pr-10 rounded-lg focus:border-theodo-blue focus:outline-none"
                placeholder={placeholder}
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-theodo-dark-blue">
                {icon}
            </div>
        </div>
    );
};
