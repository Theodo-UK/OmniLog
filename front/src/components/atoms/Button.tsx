type ButtonProps = {
    children: React.ReactNode;
    onClick: () => void;
    className?: string;
    colour?: "blue" | "grey" | "green" | "red";
};

export const Button = ({
    children,
    onClick,
    className,
    colour = "blue",
    ...props
}: ButtonProps) => {
    const bgColour = colourPicker(colour);
    return (
        <button
            className={` ${bgColour} text-white font-bold py-2 px-4 rounded ${className} transition-colors duration-100`}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
};

const colourPicker = (colour: string): string => {
    const blueStyle = "bg-theodo-turquoise hover:bg-omnilog-clear-blue";
    const greyStyle = "bg-theodo-grey-regular hover:bg-theodo-turquoise";
    const greenStyle = "bg-theodo-green-dark hover:bg-theodo-green-regular";
    const redStyle = "bg-red-600 hover:bg-red-500";
    switch (colour) {
        case "blue":
            return blueStyle;
        case "grey":
            return greyStyle;
        case "green":
            return greenStyle;
        case "red":
            return redStyle;
        default:
            return blueStyle;
    }
};
