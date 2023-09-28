import {
    faSort,
    faSortDown,
    faSortUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const SortIcon = ({ order }: { order: string | undefined }) => {
    if (order === "asc") {
        return <FontAwesomeIcon icon={faSortUp} />;
    }
    if (order === "desc") {
        return <FontAwesomeIcon icon={faSortDown} />;
    }
    return (
        <span className="text-gray-300">
            <FontAwesomeIcon icon={faSort} />
        </span>
    );
};
