type ButtonProps = {
    children: React.ReactNode;
    onClick: () => void;
    className?: string;
};

export const Button = ({ children, onClick, className, ...props }: ButtonProps) => {
    return (
        <button
            className={` bg-theodo-turquoise hover:bg-omnilog-clear-blue text-white font-bold py-2 px-4 rounded ${className} transition-colors duration-100`}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
}