export const CardAtom = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="border bg-white shadow rounded-md p-4 w-full mx-auto flex flex-col gap-4">
            {children}
        </div>
    );
};
