import { Tooltip } from "../../../components/atoms/Tooltip";

export const ColumnContent = ({
    content,
    tooltip,
}: {
    content: string;
    tooltip?: string;
}) => {
    return (
        <td className="px-4 py-2 text-gray-800 truncate">
            {tooltip ? <Tooltip text={tooltip}>{content}</Tooltip> : content}
        </td>
    );
};
