import * as RT from '@radix-ui/react-tooltip'

type TooltipProps = {
    children: React.ReactNode;
    text: string;
};

export const Tooltip = ({ children, text }: TooltipProps) => {
    return (
        <RT.Provider>
            <RT.Root delayDuration={400}>
                <RT.Trigger asChild >
                    <button>{children}</button>
                </ RT.Trigger>
                < RT.Portal >
                    <RT.Content sideOffset={2} >
                        <p
                            className="text-gray-800 text-center bg-gray-50 rounded-md shadow-md py-1 px-2 m-0.5 border-gray-100"
                            style={{ maxWidth: "200px" }}
                        >{text}</p>
                        < RT.Arrow />
                    </RT.Content>
                </ RT.Portal>
            </ RT.Root>
        </ RT.Provider>
    );
};

