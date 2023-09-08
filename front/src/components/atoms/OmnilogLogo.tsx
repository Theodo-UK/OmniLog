import logo from "@/assets/circle_logo.png";
import Image from "next/image";

export const OmnilogLogo = () => {
    return (
        <Image
            src={logo.src}
            alt="Omnilog logo"
            height={150}
            width={150}
        />
    );
};
