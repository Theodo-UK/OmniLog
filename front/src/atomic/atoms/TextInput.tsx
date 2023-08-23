import React from "react";

export const TextInput = ({
    placeholder = "",
    icon = "",
}: {
    placeholder: string;
    icon: React.ReactNode;
}) => {
    return (
        <div className="relative">
            <input
                type="text"
                className="w-full border-2 border-gray-300 bg-white h-10 px-4 pr-16 rounded-lg focus:border-theodo-blue focus:outline-none"
                placeholder={placeholder}
            />
            <div className="absolute right-0 top-0 py-3 px-3">{icon}</div>
        </div>
    );
};
