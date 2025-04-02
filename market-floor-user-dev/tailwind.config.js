
        /** @type {import('tailwindcss').Config} */

        const screens = {
  "phone": "600px",
  "tablet": "768px",
  "laptop": "1024px",
  "desktop": "1270px",
  "television": "1600px"
};

        module.exports = {
          content: [
  "./src/pages/**/*.{js,ts,jsx,tsx}",
  "./src/app/**/*.{js,ts,jsx,tsx}",
  "./src/apps/(main)/**/*.{js,ts,jsx,tsx}",
  "./src/containers/**/*.{js,ts,jsx,tsx}",
  "./src/components/**/*.{js,ts,jsx,tsx}",
  "./src/components/atoms/**/*.{js,ts,jsx,tsx}",
  "./src/components/molecules/**/*.{js,ts,jsx,tsx}",
  "./src/components/organisms/**/*.{js,ts,jsx,tsx}",
  "./src/components/templates/**/*.{js,ts,jsx,tsx}",
  "./src/layouts/**/*.{js,ts,jsx,tsx}",
  "./src/designs/**/*.{js,ts,jsx,tsx}"
],
          theme: {
            extend: {
              screens,
              colors: {
  "primary": {
    "100": "#4dff4d",
    "200": "#1aff1a",
    "300": "#00e600",
    "400": "#00b300",
    "500": "#008000",
    "600": "#004d00",
    "700": "#001a00",
    "800": "#000000",
    "900": "#000000"
  },
  "secondary": {
    "50": "#FFFFFF",
    "100": "#FFFFFF",
    "200": "#FFFFFF",
    "300": "#FFFFFF",
    "400": "#FFFFFF",
    "500": "#FFFFFF",
    "600": "#CCCCCC",
    "700": "#999999",
    "800": "#666666",
    "900": "#333333",
    "950": "#1A1A1A"
  },
  "green": {
    "50": "#E9FBF0",
    "100": "#CFF7DE",
    "200": "#9FEFBC",
    "300": "#6FE69B",
    "400": "#40DE7A",
    "500": "#22C55E",
    "600": "#1B9D4B",
    "700": "#147538",
    "800": "#0D4E25",
    "900": "#072713",
    "950": "#04160A"
  }
},
            },
          },
          plugins: [],
        };
        