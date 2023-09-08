import logo from "@/assets/theodo_logo.png";
import Image from "next/image";

export const TheodoLogo = () => {
    return (
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
            <a
                className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
                href="https://www.theodo.co.uk/"
                target="_blank"
                rel="noopener noreferrer"
            >

                <Image
                    src={logo.src}
                    alt="Theodo logo"
                    height={120}
                    width={120}
                />
            </a>
        </div>
    );
};
