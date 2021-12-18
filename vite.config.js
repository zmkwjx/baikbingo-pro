import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default ({ mode }) => {
  return defineConfig({
    base: "/",
    plugins: [vue()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src")
      }
    },
    build: {
      outDir: `dist/${loadEnv(mode, process.cwd()).VITE_APP_NAME}`
    },
    // 预设样式
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: "@import '/src/styles/index.scss';"
        }
      }
    }
  });
};
