import { createRouter, createWebHashHistory } from "vue-router";
import { RouteStruct } from "@/types";
import AsyncRouter from "./async-router"; // 封装的路由控制方法
import PageRouter from "./page"; // 页面路由
import { initStore } from "@/store";

// 获得 route 实例
const router = {
  ...createRouter({
    history: createWebHashHistory(),
    routes: [...PageRouter]
  }),
  $asyncRouter: {
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
initStore();
AsyncRouter.install({
  router,
  store: null
});
router.$asyncRouter.render(
  [
    {
      path: "/test",
      name: "test",
      icon: "icon",
      children: [
        {
          path: "/test/test2",
          name: "test2",
          icon: "icon"
        }
      ]
    },
    {
      path: "/test1",
      name: "test1",
      icon: "icon"
    }
  ],
  true
);

// 导出
export default router;
