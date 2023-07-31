import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import LoginView from "@/views/login/LoginView.vue";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: LoginView,
  },
  {
    path: "/LoginView",
    component: () => import("@/views/login/LoginView.vue"),
  },
  {
    path: "/ProjectView",
    component: () => import("@/views/Project/ProjectView.vue"),
  },
  {
    path: "/Staging",
    component: () => import("@/views/Staging/StagingView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
