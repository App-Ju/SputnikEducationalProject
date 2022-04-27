import { defineStore } from "pinia";
import Board from "@/models/Board.model";

export const useBoardsStore = defineStore({
  id: "boards",
  state: () => ({
    boards: [] as Board[],
    isFavoriteBoards: [] as Board[],
  }),
  getters: {},
  actions: {
    addBoardName(id: number, name: string): void {
      this.boards.push(new Board(id, name, false));
    },
    deleteBoard(id: number): void {
      const index = this.boards.findIndex((el) => el.id === id);
      const indexFav = this.isFavoriteBoards.findIndex((el) => el.id === id);
      this.boards.splice(index, 1);
      if (indexFav !== -1) this.isFavoriteBoards.splice(indexFav, 1);
    },
    editBoardName(id: number, name: string): void {
      const index = this.boards.findIndex((el) => el.id === id);
      this.boards[index].name = name;
    },
    addFavoriteBoard(id: number): void {
      if (!this.isFavoriteBoards.find((el) => el.id === id)) {
        const index = this.boards.findIndex((el) => el.id === id);
        this.boards[index].isFavorite = true;
        this.isFavoriteBoards.push(this.boards[index]);
      } else {
        const index = this.isFavoriteBoards.findIndex((el) => el.id === id);
        this.isFavoriteBoards[index].isFavorite = false;
        this.isFavoriteBoards.splice(index, 1);
      }
    },
  },
});
