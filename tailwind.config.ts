import { heroui } from "@heroui/react"
import type { Config } from 'tailwindcss'
const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                "background": "#FDFDFD",
                "foreground": "#033658",
                "primary": {
                    "foreground": "#FFFFFF",
                    DEFAULT: "#017195",
                },
                "secondary": {
                    "foreground": "#017195",
                    DEFAULT: "#D9EFFE"
                },
                "lightgray": "#F0F0F0",
                "lightblue": "#B5D3D9",
                "badge": '#F1F7F6',
                "flashwhite": "#F1F6F7",
                "text-primary": "#033658",
                "button-primary": "#017195",
                "button-light-primary": '#D9EFFE',
                "hover-button-primary": '#028bb8',
                "text-light-gray": "#EAEAEA",
                "light-text": "#FEFEFE",
                "text-gray": "#A1A1A1",
                "sunset": "#FFCB77",
                "text-lighter-gray": '#F8F8F8',
                "blue-light-primary": "#D9EFFE",
                "african-violet": "#9D79BC",
                "light-sea-green": "#17C3B2",
                "text-format-icon": "#969696",
            },
            gradientColorStopPositions: {
                33: '33%',
            },
            screens: {
                'xs': '360px', // Custom breakpoint for extra-small screens
                'sm': '640px', // Default small screen
                'md': '768px', // Default medium screen
                'lg': '1024px', // Default large screen
                'xl': '1280px', // Default extra-large screen
            },
        },
    },
    plugins: [heroui({
      addCommonColors: true,
    })],
}
export default config
