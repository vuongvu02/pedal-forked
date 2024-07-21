import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [react(), dts({ include: ["lib"] })],
  build: {
    lib: {
      entry: resolve(__dirname, "lib/main.ts"),
      formats: ["es", "cjs"],
    },
    copyPublicDir: false,
  },
});
