/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "rgb(45, 45, 45)",
				primaryHover: "rgb(70,70,70)",
				secondary: "rgb(77, 102, 145)",
				tertiary: "rgb(0, 120, 120)",
				glass: "rgba(0,0,0,.05)",
				success: "rgb(75, 160, 50)",
				danger: "rgb(200, 0, 50)",
				warning: "rgb(240, 210, 20)",
			},
		},
	},
	plugins: [],
	screens: {
		sm: "640px",
		md: "768px",
		lg: "1024px",
		xl: "1280px",
		"2xl": "1536px",
	},
};
