import { createRouter, createWebHashHistory } from "vue-router";
import { RouteStruct } from "@/types";
import { useStore } from "@/store";
import AsyncRouter from "./async-router"; // 封装的路由控制方法
import PageRouter from "./page"; // 页面路由

// 创建路由
// 获得 route 实例
const router = {
  ...createRouter({
    history: createWebHashHistory(),
    routes: [...PageRouter],
    scrollBehavior(to) {
      if (to.hash) {
        return {
          el: to.hash,
          behavior: "smooth"
        };
      }
      // 始终滚动到顶部
      return { top: 0 };
    }
  }),
  $asyncRouter: {
    status: false,
    resetRouter: () => {},
    render: (menus: RouteStruct[], first: boolean): RouteStruct[] => {
      const aRouter: RouteStruct[] = menus;
      if (first) {
        return aRouter;
      }
      return aRouter;
    }
  }
};

// 初始化和注册动态路由
AsyncRouter.install({
  router,
  store: useStore()
});

export function resetRouter() {
  router.$asyncRouter.resetRouter();
}

// 导出
export default router;
