import React from "react";

export const TextInput = ({
    placeholder = "",
    icon = "",
    onSubmit,
}: {
    placeholder: string;
    icon: React.ReactNode;
    onSubmit: (text: string) => void;
}) => {
    const [text, setText] = React.useState("");
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onSubmit(text);
        }
    };
    return (
        <div className="relative w-full">
            <input
                type="text"
                className="w-full border-2 border-gray-300 bg-white h-10 pl-3 pr-10 rounded-lg focus:border-theodo-blue focus:outline-none"
                placeholder={placeholder}
                onKeyDown={handleKeyDown}
                onInput={(e) => setText(e.currentTarget.value)}
            />
            <div
                className=" cursor-pointer absolute inset-y-0 right-0 flex items-center px-3 text-theodo-dark-blue"
                onClick={() => onSubmit(text)}
            >
                {icon}
            </div>
        </div>
    );
};
