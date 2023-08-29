import { OmnilogLogo } from "../atoms/OmnilogLogo";
import { TheodoLogo } from "../atoms/TheodoLogo";

export const Scaffold = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="flex min-h-screen flex-col items-center justify-evenly p-24 pt-10 gap-4">
            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
                <OmnilogLogo />
                <TheodoLogo />
            </div>
            <div className="flex flex-col gap-4 w-full">{children}</div>
        </main>
    );
};
