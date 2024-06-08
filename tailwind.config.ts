import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./(app|components)/**/*.{ts,tsx,mdx}", "./mdx-components.tsx"],
  theme: {
    hljs: {
      theme: "atom-one-dark",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("tailwind-highlightjs")],
  safelist: [
    {
      pattern: /hljs+/,
    },
  ],
};
export default config;
