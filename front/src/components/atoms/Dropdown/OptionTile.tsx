import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const DropdownOptionTile = ({
    option,
    isSelected,
}: {
    option: string;
    isSelected: boolean;
}) => {
    return (
        <>
            <span
                className={`block truncate ${isSelected ? "font-medium" : "font-normal"
                    }`}
            >
                {option}
            </span>
            {isSelected ? (
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-theodo-blue-dark">
                    <FontAwesomeIcon icon={faCheck} />
                </span>
            ) : null}
        </>
    );
};
