import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MouseEventHandler } from "react";

type ButtonIconProps = {
    onClick: MouseEventHandler<HTMLButtonElement>;
    icon: IconDefinition;
};

export const ButtonIcon = ({ onClick, icon }: ButtonIconProps) => {
    return (
        <button
            className="bg-white hover:bg-theodo-grey-regular outline outline-gray-500 text-gray-600 rounded-3xl h-6 w-6 justify-center align-middle transition-colors duration-100"
            onClick={onClick}
        >
            <FontAwesomeIcon icon={icon} />
        </button>
    );
};
