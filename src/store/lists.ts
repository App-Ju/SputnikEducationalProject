import { defineStore } from "pinia";
import List from "@/models/List.model";
import Task from "@/models/Task.model";

export const useListsStore = defineStore({
  id: "lists",
  state: () => ({ lists: [] as List[] }),
  getters: {},
  actions: {
    addListName(boardId: number, id: number, name: string) {
      this.lists.push(new List(boardId, id, name, []));
      console.log(this.lists);
    },
  },
});
