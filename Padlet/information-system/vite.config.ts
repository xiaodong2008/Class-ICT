import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: "./site",
    emptyOutDir: true, // also necessary
  },
  base: "/information-system/",
});
