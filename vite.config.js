import { defineConfig, loadEnv } from "vite";
import { viteMockServe } from "vite-plugin-mock";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default ({ mode }) => {
  return defineConfig({
    base: "/",
    plugins: [
      vue(),
      viteMockServe({
        // default
        mockPath: "./src/mock",
        supportTs: true,
        localEnabled:
          loadEnv(mode, process.cwd()).VITE_NODE_ENV === "development"
      })
    ],
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
