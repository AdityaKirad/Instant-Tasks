import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "40em",
      md: "48em",
      lg: "64em",
      xl: "80em",
      "2xl": "96em",
    },
    extend: {
      keyframes: {
        "collapsible-open": {
          from: { height: "0" },
          to: { height: "var(--radix-collapsible-content-height)" },
        },
        "collapsible-close": {
          from: { height: "var(--radix-collapsible-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "collapsible-open": "collapsible-open 150ms ease-out",
        "collapsible-close": "collapsible-close 150ms ease-in",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
