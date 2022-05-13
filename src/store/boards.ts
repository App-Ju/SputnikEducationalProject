import { defineStore } from "pinia";
import Board from "@/models/Board.model";

export const useBoardsStore = defineStore({
  id: "boards",
  state: () => ({
    boards: [] as Board[],
    favoriteBoards: [] as Board[],
  }),
  actions: {
    /**
     * Добавляет в стейт boards инстанс класса Board
     * @param id - id добавляемой доски
     * @param name - имя добавляемой доски
     */
    addBoardName(id: number, name: string): void {
      this.boards.push(new Board(id, name, false, false));
    },
    /**
     * Удаляет доску из стейта boards и из favoriteBoards(при наличии), находит индекс досок по id
     * @param id - id удаляемой доски
     */
    deleteBoard(id: number): void {
      const index: number = this.boards.findIndex((el) => el.id === id);
      const indexFav: number = this.favoriteBoards.findIndex(
        (el) => el.id === id
      );
      this.boards.splice(index, 1);
      if (indexFav !== -1) this.favoriteBoards.splice(indexFav, 1);
    },
    /**
     * Меняет параметр name доски, находит индекс доски по id
     * @param id - id редактируемой доски
     * @param name - новое имя редактируемой доски
     */
    editBoardName(id: number, name: string): void {
      const index: number = this.boards.findIndex((el) => el.id === id);
      const indexFav: number = this.favoriteBoards.findIndex(
        (el) => el.id === id
      );
      this.boards[index].name = name;
      this.favoriteBoards[indexFav].name = name;
    },
    /**
     * Добавляет доску в стейт favoriteBoards либо удаляет из него
     * @param id - id редактируемой доски
     */
    addFavoriteBoard(id: number): void {
      if (!this.favoriteBoards.find((el) => el.id === id)) {
        const index: number = this.boards.findIndex((el) => el.id === id);
        this.boards[index].isFavorite = true;
        this.favoriteBoards.push(Object.assign({}, this.boards[index]));
      } else {
        const index: number = this.boards.findIndex((el) => el.id === id);
        const indexFav: number = this.favoriteBoards.findIndex(
          (el) => el.id === id
        );
        this.boards[index].isFavorite = false;
        this.favoriteBoards.splice(indexFav, 1);
      }
    },
  },
});
