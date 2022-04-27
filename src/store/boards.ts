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
    /**
     * Добавляет в стейт boards инстанс класса Board
     * @param id - id добавляемой доски
     * @param name - имя добавляемой доски
     */
    addBoardName(id: number, name: string): void {
      this.boards.push(new Board(id, name, false));
    },
    /**
     * Удаляет доску из стейта boards и из isFavoriteBoards(при наличии), находит индекс досок по id
     * @param id - id удаляемой доски
     */
    deleteBoard(id: number): void {
      const index = this.boards.findIndex((el) => el.id === id);
      const indexFav = this.isFavoriteBoards.findIndex((el) => el.id === id);
      this.boards.splice(index, 1);
      if (indexFav !== -1) this.isFavoriteBoards.splice(indexFav, 1);
    },
    /**
     * Меняет параметр name доски, находит индекс доски по id
     * @param id - id редактируемой доски
     * @param name - новое имя редактируемой доски
     */
    editBoardName(id: number, name: string): void {
      const index = this.boards.findIndex((el) => el.id === id);
      this.boards[index].name = name;
    },
    /**
     * Добавляет доску в стейт isFavoriteBoards либо удаляет из него
     * @param id - id редактируемой доски
     */
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
