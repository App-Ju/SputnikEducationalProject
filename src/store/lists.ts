import { defineStore } from "pinia";
import List from "@/models/List.model";
import Task from "@/models/Task.model";

export const useListsStore = defineStore({
  id: "lists",
  state: () => ({
    lists: [] as List[],
    currentBoardLists: [] as List[],
  }),
  getters: {},
  actions: {
    addListName(boardId: number, id: number, name: string) {
      console.log(this.lists);
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
    addTaskName(listId: number, id: number, name: string) {
      const index = this.lists.findIndex((el) => el.id === listId);
      this.lists[index].tasks.push(new Task(id, name, ""));
    },
    editTaskName(id: number, name: string) {
      // this.lists.tasks.find((el) => el.id === id);
      // let listIndex = null;
      // for (let i = 0; i < this.lists.length; i++) {
      //   for (let j = 0; j < this.lists[i].tasks.length; j++) {
      //     if (this.lists[i].tasks[j].include(id)) {
      //       console.log(this.lists[i].tasks[j]);
      //     }
      //   }
      // }
      // const taskIndex = this.lists[listIndex].tasks.findIndex(
      //   (el) => el.id === id
      // );
      // console.log(listIndex, name);
      // this.lists[listIndex][taskIndex] = name;
    },
    showCurrentBoardStore(boardId: number) {
      this.currentBoardLists = this.lists.filter(
        (el) => el.boardId === boardId
      );
    },
  },
});
