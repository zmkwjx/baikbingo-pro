export default [
  {
    path: "/login",
    name: "login",
    meta: {
      isAuth: false
    },
    component: () => import("@/page/login/index.vue")
  },
  {
    path: "/404",
    name: "404",
    meta: {
      isAuth: false
    },
    component: () => import("@/components/errorPage/404.vue")
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/404"
  }
];
