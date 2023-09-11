import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const DropdownButton = ({
    text,
    faIcon,
}: {
    text: string;
    faIcon: IconDefinition;
}) => {
    return (
        <>
            <span className="block truncate text-base">{text}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-theodo-blue-dark">
                <FontAwesomeIcon icon={faIcon} />
            </span>
        </>
    );
};
