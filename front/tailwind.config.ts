import type { Config } from "tailwindcss";
import groupModifierPlugin from "tailwindcss-group-modifier-plugin";

const config: Config = {
    content: [
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            colors: {
                "theodo-green": "#6CBC9C",
                "theodo-dark-green": "#374B42",
                "theodo-grey": "#9AB0A6",
                "theodo-sharp-blue": "#0062AD",
                "theodo-light-blue": "#6CB4E6",
                "theodo-turquoise": "#009DAC",
                "theodo-blue": "#2D7FAE",
                "theodo-dark-blue": "#17366e",
                "omnilog-clear-blue": "#02D6FB",
            },
        },
    },
    plugins: [groupModifierPlugin({ prefix: "gp" })],
};
export default config;
