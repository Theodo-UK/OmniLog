import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/atomic/**/*.{js,ts,jsx,tsx,mdx}",
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
            },
        },
    },
    plugins: [],
};
export default config;
