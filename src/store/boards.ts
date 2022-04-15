import { defineStore } from "pinia";

export const useBoardsStore = defineStore({
  id: "boards",
  state: () => ({ boards: [] as string[] }),
  getters: {},
  actions: {
    addBoardName(name: string) {
      this.boards.push(name);
    },
  },
});
