import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [solid(), tailwindcss()],
  base: "/flags-guesser/", // GitHub Pages repo name
  build: {
    target: "esnext",
    outDir: "dist",
  },
});
