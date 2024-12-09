/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "1rem",
        screens: {
          xl: "1180px",
        },
      },
      colors: {
        primary: {
          cyan: "var(--primary-cyan)",
        },
        background: {
          light: "var(--background-light)",
        },
        filter: {
          light: "var(--filter-light)",
        },
        text: {
          gray: "var(--text-gray)",
          dark: "var(--text-dark)",
        },
      },
      fontFamily: {
        heading: "var(--font-heading)",
      },
      fontSize: {
        body: "var(--font-size-body)",
      },
      fontWeight: {
        medium: "var(--font-weight-medium)",
        bold: "var(--font-weight-bold)",
      },
    },
  },
  plugins: [],
};
