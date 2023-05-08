/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{html,js,jsx, tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {},
        colors: {
            primary: "#C13DFF",
            "primary-dark": "#9B08E0",
            "dark-gray": "#191919",
            "light-gray": "#D0D0D0",
            black: "#000000",
            white: "#FFFFFF",
            warning: "#EF4444",
            "tertiary-g": "#6DEE80",
            "tertiary-r": "#F07474",
        },
    },
    plugins: [require("flowbite/plugin")],
};
