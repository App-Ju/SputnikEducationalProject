import { defineStore } from "pinia";
import List from "@/models/List.model";

export const useListsStore = defineStore({
  id: "lists",
  state: () => ({
    lists: [] as List[],
    currentBoardLists: [] as List[],
  }),
  getters: {},
  actions: {
    addListName(boardId: number, id: number, name: string) {
      this.lists.push(new List(boardId, id, name, []));
    },
    editListName(id: number, name: string) {
      const index = this.lists.findIndex((el) => el.id === id);
      this.lists[index].name = name;
    },
    deleteList(id: number) {
      const index = this.lists.findIndex((el) => el.id === id);
      this.lists.splice(index, 1);
    },
    changeCurrentBoardStore(boardId: number) {
      this.currentBoardLists = this.lists.filter(
        (el) => el.boardId === boardId
      );
    },
  },
});
