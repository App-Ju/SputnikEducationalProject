import { defineStore } from "pinia";

export const useBoardsStore = defineStore({
  id: "boards",
  state: () => ({ boards: [] as any[] }),
  getters: {},
  actions: {
    addBoardName(id: number, name: string) {
      this.boards.push({ id: id, name: name });
    },
    deleteBoard(boardId: number) {
      console.log(boardId);
      this.boards = this.boards.filter((el) => el.id !== boardId);
    },
  },
});
