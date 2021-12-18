import { createApp } from "vue";
import ElementPlus from "element-plus";
import App from "./App.vue";
import basicChunk from "@/components/basicChunk";
import asyncChunk from "@/components/asyncChunk";
import router from "@/router";
import store from "@/store";
import "element-plus/dist/index.css";

// 初始化
const app = createApp(App);
// 路由
app.use(router);
// 全局状态
app.use(store);
// 使用全局组件
app.use(basicChunk);
// 使用异步组件
app.use(asyncChunk);
// 使用ElementPlus
app.use(ElementPlus);

// 挂载
app.mount("#app");
