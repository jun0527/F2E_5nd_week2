import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory('/F2E_5nd_week2/'),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/ElectoralMap.vue")
    }
  ]
});

export default router;
