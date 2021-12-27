/* eslint-disable no-useless-return */
import { ElMessage } from "element-plus";
import router from "./index";
import store, { initStore } from "@/store";

// 报错提示
const sendMessage = (msg: any) => {
  ElMessage({
    showClose: true,
    message: msg,
    type: "error"
  });
};

// 添加标签
const setTag = (to: any) => {
  const route = to.matched[2] || {};
  store.dispatch("SetTag", {
    name: to.query.name || to.name,
    path: to.fullPath,
    moduleName: route.name || null,
    modulePath: route.path || null,
    timestamp: new Date().getTime()
  });
};

// 初始化路由菜单
const initRouterMenu = () => {
  return store.dispatch("GetMenu").then((data) => {
    router.$asyncRouter.render(data, true);
  });
};

// 路由守卫
router.beforeEach(async (to, from, next) => {
  await initStore();
  const { token } = store.getters;
  const isAuth = to?.meta?.isAuth;
  // 判断是否需要认证，没有登录访问去登录页
  if (isAuth === false) {
    next();
  } else if (token) {
    // 如果登录成功访问登录页跳转到主页
    if (to.path === "/login") {
      next({ path: "/" });
      // 如果菜单已经动态渲染
    } else if (router.$asyncRouter.status) {
      // 路由是否匹配
      if (to.matched[0]) {
        setTag(to);
        next();
      } else {
        next({ path: "/404" });
      }
      // 如果菜单尚未动态渲染
    } else {
      try {
        await initRouterMenu();
        next({ ...to });
      } catch (error) {
        sendMessage("网络错误");
        next({ path: "/500" });
      }
    }
    // 判断是否需要认证，没有登录访问去登录页
  } else {
    next({ path: "/login" });
  }
});

router.afterEach(() => {});
