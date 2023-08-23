import { OmnilogLogo, TheodoLogo } from "../atoms";

export const Scaffold = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="flex min-h-screen flex-col items-center justify-evenly p-24">
            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
                <OmnilogLogo />
                <TheodoLogo />
            </div>
            {children}
        </main>
    );
};
