const fs = require("fs");
const axios = require("axios");
const tinycolor = require("tinycolor2");

function generateThemeSchema(primaryColor) {
  try {
    const color = new tinycolor(primaryColor);

    const scheme = {
      100: color.clone().lighten(40).toHexString(),
      200: color.clone().lighten(30).toHexString(),
      300: color.clone().lighten(20).toHexString(),
      400: color.clone().lighten(10).toHexString(),
      500: color.toHexString(),
      600: color.clone().darken(10).toHexString(),
      700: color.clone().darken(20).toHexString(),
      800: color.clone().darken(30).toHexString(),
      900: color.clone().darken(40).toHexString(),
    };

    return scheme;
  } catch (error) {
    console.log("generateThemeSchema error", error);
  }
}

const fetchTailwindConfig = async () => {
  try {
    const response = await axios.get(`${apiURL}/tenant/config`);
    if (response?.data?.success) {
      const primaryColor = response.data?.data?.primaryColorScheme;

      const screens = {
        phone: "600px",
        tablet: "768px",
        laptop: "1024px",
        desktop: "1270px",
        television: "1600px",
      };

      const content = [
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
        "./src/designs/**/*.{js,ts,jsx,tsx}",
      ];

      const colors = {
        primary: generateThemeSchema(primaryColor),
        secondary: {
          50: "#FFFFFF",
          100: "#FFFFFF",
          200: "#FFFFFF",
          300: "#FFFFFF",
          400: "#FFFFFF",
          500: "#FFFFFF",
          600: "#CCCCCC",
          700: "#999999",
          800: "#666666",
          900: "#333333",
          950: "#1A1A1A",
        },
        green: {
          50: "#E9FBF0",
          100: "#CFF7DE",
          200: "#9FEFBC",
          300: "#6FE69B",
          400: "#40DE7A",
          500: "#22C55E",
          600: "#1B9D4B",
          700: "#147538",
          800: "#0D4E25",
          900: "#072713",
          950: "#04160A",
        },
      };

      const configContent = `
        /** @type {import('tailwindcss').Config} */

        const screens = ${JSON.stringify(screens, null, 2)};

        module.exports = {
          content: ${JSON.stringify(content, null, 2)},
          theme: {
            extend: {
              screens,
              colors: ${JSON.stringify(colors, null, 2)},
            },
          },
          plugins: [],
        };
        `;

      console.log("configContent", configContent);
      fs.writeFileSync("tailwind.config.js", configContent);
      console.log(
        "Tailwind CSS configuration fetched and written to tailwind.config.js",
      );
    } else {
      console.error(
        "Error fetching Tailwind CSS configuration:",
        response?.data?.message,
      );
    }
  } catch (error) {
    console.error("Error fetching Tailwind CSS configuration:", error);
  }
};

fetchTailwindConfig();
