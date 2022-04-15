import { defineStore } from "pinia";
import Board from "@/models/Board.model";

export const useBoardsStore = defineStore({
  id: "boards",
  state: () => ({ boards: [] as Board[] }),
  getters: {},
  actions: {
    addBoardName(id: number, name: string) {
      this.boards.push(new Board(id, name, false));
    },
    deleteBoard(id: number) {
      const index = this.boards.findIndex((el) => el.id === id);
      this.boards.splice(index, 1);
    },
  },
});
