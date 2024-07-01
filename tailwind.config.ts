import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'main-bg': "url('/mainBackground.png')",
      },
      fontFamily: {
        nightydemo: ['Nightydemo', 'sans-serif'],
      },
      letterSpacing: {
        wider: '0.05em',
      },
    },
  },
  plugins: [],
};
export default config;
