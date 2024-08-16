import { defineConfig } from "vite";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  server: {
    port: 3000,
    host: true,
  },
  preview: {
    host: true,
    port: 3000,
  },
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "./src/components"),
      "@domain": path.resolve(__dirname, "./src/domain"),
      "@services": path.resolve(__dirname, "./src/services"),
      "@styles": path.resolve(__dirname, "./src/styles"),
      "@utils": path.resolve(__dirname, "./src/utils"),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
});
