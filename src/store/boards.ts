import { defineStore } from "pinia";
import Board from "@/models/Board.model";

export const useBoardsStore = defineStore({
  id: "boards",
  state: () => ({ boards: [] as Board[] }),
  getters: {
    isFavoriteBoards: (state) => state.boards.filter((el) => el.isFavorite),
  },
  actions: {
    addBoardName(id: number, name: string) {
      this.boards.push(new Board(id, name, false));
    },
    deleteBoard(id: number) {
      const index = this.boards.findIndex((el) => el.id === id);
      this.boards.splice(index, 1);
    },
    editBoardName(id: number, name: string) {
      const index = this.boards.findIndex((el) => el.id === id);
      this.boards[index].name = name;
    },
    changeFavoriteBoard(id: number) {
      const index = this.boards.findIndex((el) => el.id === id);
      console.log(this.boards[index].isFavorite);
      this.boards[index].isFavorite = !this.boards[index].isFavorite;
      console.log(this.boards[index].isFavorite);
    },
  },
});
