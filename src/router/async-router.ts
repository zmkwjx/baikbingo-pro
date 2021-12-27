import { v4 as uuidv4 } from "uuid";
import { RouteStruct, RouterPluginStruct } from "@/types";

// 引入模块
const modules = import.meta.glob("/src/views/**/index.vue");

// 声明
const RouterPlugin: RouterPluginStruct = {
  $router: null,
  $store: null,
  install: () => {}
};

// 安装
RouterPlugin.install = (option: { router: any; store: any }) => {
  const vm = RouterPlugin;
  vm.$router = option.router;
  vm.$store = option.store;

  // 将动态的路由注册到vue-router中
  vm.$router.$asyncRouter = {
    source: [], // 源数据
    global: vm, // 指针指向
    status: false, // 状态

    // 设置状态
    setStatus() {
      this.status = uuidv4();
    },

    // 批量添加路由
    addRoutes(data: RouteStruct[]) {
      for (let i = 0; i < data.length; i += 1) {
        this.global.$router.addRoute(data[i]);
      }
    },

    // 渲染动态路由
    render(menus: RouteStruct[], first: boolean): RouteStruct[] {
      const aRouter: RouteStruct[] = [];
      // 如果没有权限菜单就结束
      if (menus.length === 0) {
        this.setStatus();
        return aRouter;
      }
      // 开始处理菜单
      for (let i = 0; i < menus.length; i += 1) {
        // 取到当前要处理的一项
        const oMenu = menus[i];
        // 判断this.source中是否已经存在该path，存在就跳出
        if (this.source.includes(oMenu.path)) return aRouter;
        // 取到返回的值
        const component = `/src/views${oMenu.path}/index.vue`;
        const children = oMenu.children || [];
        const meta = oMenu.meta || { cache: false };
        // 是否有子路由
        const isChild = children.length !== 0;
        const oRouter = {
          path: oMenu.path,
          component: () => {
            // 判断是否为多层路由
            if (isChild) {
              return modules[component]
                ? modules[component]()
                : import("@/page/index/layout.vue");
            }
            // 判断是否为最终的页面视图
            return modules[component]
              ? modules[component]()
              : import("@/components/errorPage/500.vue");
          },
          name: oMenu.name,
          icon: oMenu.icon,
          meta,
          redirect: isChild ? children[0].path : "",
          // 整理子路由的route 配置
          children: isChild ? this.render(children, false) : []
        };
        aRouter.push(oRouter);
      }
      // for循环结束
      if (first) {
        if (!this.source.includes(aRouter[0].path)) {
          this.addRoutes([
            {
              path: "/",
              component: () => import("@/page/index/index.vue"),
              redirect: "/dashboard",
              children: [
                {
                  path: "/dashboard",
                  name: "dashboard",
                  component: () => import("@/page/dashboard/index.vue")
                },
                ...aRouter
              ]
            }
          ]);
          this.source.push(aRouter[0].path);
        }
        this.setStatus();
      }
      // 这里返回的是子组件
      return aRouter;
    }
  };
};

export default RouterPlugin;
