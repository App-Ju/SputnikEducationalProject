import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import BoardView from "@/views/BoardView.vue";
import ListAndTaskView from "@/views/ListAndTaskView.vue";
import { useBoardsStore } from "@/store/boards";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "BoardsView",
    component: BoardView,
  },
  {
    path: "/tasks/:id",
    name: "ListAndTaskView",
    component: ListAndTaskView,
    beforeEnter: (to, from) => {
      const boardsStore = useBoardsStore();
      if (!boardsStore.boards.length) {
        console.log(boardsStore.boards.length);
        return { name: "BoardsView" };
      }
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
