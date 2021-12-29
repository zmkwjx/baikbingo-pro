import { createApp } from "vue";
import ElementPlus from "element-plus";
import Particles from "particles.vue3";
import App from "./App.vue";
import basicChunk from "@/components/basicChunk";
import asyncChunk from "@/components/asyncChunk";
import router from "@/router";
import "@/router/guard-router"; // 路由守卫
import store, { storeKey, useStore } from "@/store";
import "element-plus/dist/index.css";
import "nprogress/nprogress.css";

// 初始化
const app = createApp(App);
// 路由
app.use(router);
// 全局状态
app.use(store, storeKey);
app.config.globalProperties.$store = useStore();
// 使用全局组件
app.use(basicChunk);
// 使用异步组件
app.use(asyncChunk);
// 粒子特效
app.use(Particles);
// 使用ElementPlus
app.use(ElementPlus);
// 挂载
app.mount("#app");
