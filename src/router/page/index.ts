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
    path: "/500",
    name: "500",
    meta: {
      isAuth: false
    },
    component: () => import("@/components/errorPage/500.vue")
  }
];
