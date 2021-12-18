export default [
  {
    path: "/404",
    name: "404",
    component: () => import("@/components/errorPage/404.vue")
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/404"
  }
];
