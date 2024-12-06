/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{html,ts}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        primary: "hsl(var(--primary))",
        primary_foreground: "hsl(var(--primary-foreground))",
        foreground: "hsl(var(--foreground))",
        background: "hsl(var(--background))",
        secondary: "hsl(var(--secondary))",
        secondary_foreground: "hsl(var(--secondary-foreground))",
        card: "hsl(var(--card))",
        card_foreground: "hsl(var(--card-foreground))",
        popover: "hsl(var(--popover))",
        popover_foreground: "hsl(var(--popover-foreground))",
        muted: "hsl(var(--muted))",
        muted_foreground: "hsl(var(--muted-foreground))",
        accent: "hsl(var(--accent))",
        accent_foreground: "hsl(var(--accent-foreground))",
        destructive: "hsl(var(--destructive))",
        destructive_foreground: "hsl(var(--destructive-foreground))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        radius: "hsl(var(--radius))" ,     
      },
    },
  },

  plugins: [],
};
