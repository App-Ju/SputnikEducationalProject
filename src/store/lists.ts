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
      const index = this.findTask(id);
      this.lists[index[0]].tasks[index[1]].name = name;
    },
    deleteTask(id: number) {
      const index = this.findTask(id);
      this.lists[index[0]].tasks.splice(index[1], 1);
    },
    openTask(id: number) {
      const index = this.findTask(id);
      const taskName = this.lists[index[0]].tasks[index[1]].name;
      const taskDescription = this.lists[index[0]].tasks[index[1]].description;
      return [taskName, taskDescription];
    },
    editTask(id: number, name: string, description: string) {
      const index = this.findTask(id);
      this.lists[index[0]].tasks[index[1]].name = name;
      this.lists[index[0]].tasks[index[1]].description = description;
    },
    showCurrentBoardStore(boardId: number) {
      this.currentBoardLists = this.lists.filter(
        (el) => el.boardId === boardId
      );
    },
    findTask(id: number) {
      const listIndex = this.lists.findIndex((el) =>
        el.tasks.find((el) => el.id === id)
      );
      const taskIndex = this.lists[listIndex].tasks.findIndex(
        (el) => el.id === id
      );
      return [listIndex, taskIndex];
    },
  },
});
