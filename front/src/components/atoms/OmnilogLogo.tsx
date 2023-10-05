import logo from "@/assets/circle_logo.png";
import Image from "next/image";

export const OmnilogLogo = () => {
    return (
        <div className="justify-center m-auto">
            <Image src={logo.src} alt="Omnilog logo" height={150} width={150} />
            <p className="text-2xl dark:text-white font-bold text-center -m-4 drop-shadow-[0px_-2px_0px_rgba(250,250,255,1)] dark:drop-shadow-[0px_-2px_0px_rgba(0,0,0,1)]">
                Omnilog
            </p>
        </div>
    );
};
