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
                theodo: {
                    green: {
                        regular: "#6CBC9C",
                        dark: "#374B42",
                    },
                    grey: {
                        regular: "#9AB0A6",
                    },
                    blue: {
                        sharp: "#0062AD",
                        light: "#6CB4E6",
                        regular: "#2D7FAE",
                        dark: "#17366e",
                    },
                    turquoise: "#009DAC",
                },
                "omnilog-clear-blue": "#02D6FB",
            },
        },
    },
    plugins: [groupModifierPlugin({ prefix: "gp" })],
    safelist: [
        {
            pattern: /theodo-(green|grey|blue)-[a-z]+/,
            variants: ["hover"],
        },
    ],
};
export default config;
