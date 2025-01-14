import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        blue: {
          ...require("tailwindcss/colors").blue,
          990: "#050820",
        },
      },
      scale: {
        "101": "1.01",
      },
    },
  },
  plugins: [],
} satisfies Config;
