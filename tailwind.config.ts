/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: "class",
	content: {
		files: [
			"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
			"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
			"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		],
	},
	theme: {
		extend: {
			fontFamily: {
				sans: ['"SF Pro Display Light"', `system-ui`, `sans-serif`],
			},
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			boxShadow: {
				inline: `inset 0px 4px 10px rgba(0, 0, 0, 0.71);`,
			},
			colors: {
				black: "#000000",
				white: "#ffffff",
			},
		},
	},
	plugins: [],
};
