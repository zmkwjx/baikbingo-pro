import router from "./index";
import store, { initStore } from "@/store";

router.beforeEach(async (to, from, next) => {
  await initStore();
  const { token } = store.getters;
  if (token) {
    // 如果登录成功访问登录页跳转到主页
    if (to.path === "/login") {
      next({ path: "/" });
    } else {
      next();
    }
  } else {
    // 判断是否需要认证，没有登录访问去登录页
    const isAuth = to?.meta?.isAuth;
    if (isAuth === false) {
      next();
    } else {
      next({ path: "/login" });
    }
  }
});

router.afterEach(() => {});
