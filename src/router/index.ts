import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "BoardsView",
    component: () => import("../views/BoardView.vue"),
  },
  {
    path: "/tasks/:id",
    name: "TasksView",
    component: () => import("../views/TasksView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
