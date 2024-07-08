import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        "outline-purple": "0 0 0 4px rgba(192, 132, 252, 0.25)",
        "outline-purple-light": "0 0 0 4px rgba(245, 208, 254, 0.25)",
        "outline-purple-xs": "0 0 0 1px rgba(192, 132, 252, 0.25)",
        "outline-switch": "0 0 1px 3px rgba(168, 85, 247, 0.35)",
      },
      cursor: {
        inherit: "inherit",
      },
    },
  },
  plugins: [],
};
export default config;
