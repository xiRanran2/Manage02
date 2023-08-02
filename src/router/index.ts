import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import LoginView from "@/views/login/LoginView.vue";
// const route: RouteRecordRaw[] = [
//   {
//     path: "/",
//     name: "home",
//     component: LoginView,
//   },
// ];
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
    path: "/PersonalView",
    component: () => import("@/views/Project/PersonalView.vue"),
  },
  {
    path: "/ProjectTemplate",
    component: () => import("@/views/Project/ProjectTemplate.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
