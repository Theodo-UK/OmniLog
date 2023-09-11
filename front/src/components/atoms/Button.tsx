type ButtonProps = {
    children: React.ReactNode;
    onClick: () => void;
    className?: string;
    colour?: "blue" | "grey" | "green";
};

export const Button = ({ children, onClick, className, colour = "blue", ...props }: ButtonProps) => {
    const blueStyle = "bg-theodo-turquoise hover:bg-omnilog-clear-blue";
    const greyStyle = "bg-theodo-grey-regular hover:bg-theodo-turquoise";
    const greenStyle = "bg-theodo-green-dark hover:bg-theodo-green-regular";
    const bgColour = colour === "blue" ? blueStyle : colour === "grey" ? greyStyle : greenStyle;
    return (
        <button
            className={` ${bgColour} text-white font-bold py-2 px-4 rounded ${className} transition-colors duration-100`}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
}