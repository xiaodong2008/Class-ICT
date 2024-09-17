import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "./site",
    emptyOutDir: true, // also necessary
  },
  base: "/quickmail/",
});
