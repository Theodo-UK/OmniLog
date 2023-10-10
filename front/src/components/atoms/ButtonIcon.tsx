import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { MouseEventHandler } from "react";

export const ButtonIcon = ({
    onClick,
    icon,
}: {
    onClick: () => void;
    icon: IconDefinition;
}) => {
    const onProtectedclick: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation();
        onClick();
    };

    return (
        <button
            className={` bg-white hover:bg-theodo-grey-regular outline outline-gray-500 text-gray-600 rounded-3xl h-6 w-6 justify-center align-middle transition-colors duration-100`}
            onClick={onProtectedclick}
        >
            <FontAwesomeIcon icon={icon} />
        </button>
    );
};
