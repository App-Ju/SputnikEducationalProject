import { defineStore } from "pinia";
import List from "@/models/List.model";
import Task from "@/models/Task.model";

export const useListsStore = defineStore({
  id: "lists",
  state: () => ({
    lists: [] as List[],
    currentBoardLists: [] as List[],
  }),
  getters: {
    /**
     * Находит список в котором находится выбранная задача по id задачи
     * @return number - возвращает индекс списка
     */
    getListIndexByTaskId(state) {
      return (taskId: number) =>
        state.currentBoardLists.findIndex((el) =>
          el.tasks.find((el) => el.id === taskId)
        );
    },
    /**
     * Находит выбранную задачу по id
     * @return number - возвращает индекс задачи
     */
    getCurrentTaskIndex(state) {
      return (taskId: number) =>
        state.currentBoardLists[
          this.getListIndexByTaskId(taskId)
        ].tasks.findIndex((el) => el.id === taskId);
    },
    /**
     * Получает данные выбанной задачи
     * @return {} - возвращает объект с выбранной задачей
     */
    getCurrentTaskData(state) {
      return (taskId: number) =>
        state.currentBoardLists[this.getListIndexByTaskId(taskId)].tasks[
          this.getCurrentTaskIndex(taskId)
        ];
    },
  },
  actions: {
    /**
     * Перемещает списки для выбранной доски в отдельный стейт
     * @param boardId - id выбранной доски
     */
    cutListsState(boardId: number): void {
      this.currentBoardLists = this.lists.filter(
        (el) => el.boardId === boardId
      );
      const index: number = this.lists.findIndex(
        (el) => el.boardId === boardId
      );
      this.lists.splice(index, this.currentBoardLists.length);
    },
    /**
     * Перемещает стейт отдельной доски в общий
     */
    concatListsState(): void {
      this.lists = this.lists.concat(this.currentBoardLists);
      this.currentBoardLists = [];
    },
    /**
     * Добавляет в стейт currentBoardLists инстанс класса List
     * @param boardId - id доски к которой пивязан список
     * @param id - id добавляемого списка задач
     * @param name - имя добавляемого списка задач
     */
    addListName(boardId: number, id: number, name: string): void {
      this.currentBoardLists.push(new List(boardId, id, name, [], false));
    },
    /**
     * Изменяет параметр name списка задач
     * @param id - id редактируемого списка
     * @param name - новое имя редактируемого списка
     */
    editListName(id: number, name: string): void {
      const index: number = this.currentBoardLists.findIndex(
        (el) => el.id === id
      );
      this.currentBoardLists[index].name = name;
    },
    /**
     * Удаяет список из стейта currentBoardLists
     * @param id - id удаляемого списка
     */
    deleteList(id: number): void {
      const index: number = this.currentBoardLists.findIndex(
        (el) => el.id === id
      );
      this.currentBoardLists.splice(index, 1);
    },
    /**
     * Отображает или скрывает инпут для изменения имени списка
     * @param id - id выбранного списка
     */
    showListInput(id: number): void {
      const index: number = this.currentBoardLists.findIndex(
        (el) => el.id === id
      );
      this.currentBoardLists[index].isShowInput =
        !this.currentBoardLists[index].isShowInput;
    },
    /**
     * Добавляет в массив списка tasks иснтанс класса Task
     * @param listId - id списка, которому добавляется задача
     * @param id - id добавляемой задачи
     * @param name - имя добавляемой задачи
     */
    addTaskName(listId: number, id: number, name: string): void {
      const index: number = this.currentBoardLists.findIndex(
        (el) => el.id === listId
      );
      this.currentBoardLists[index].tasks.push(new Task(id, name, "", false));
    },
    /**
     * Изменяеь имя задачи
     * @param id - id редактируемой задачи
     * @param name - имя редактируемой задачи
     */
    editTaskName(id: number, name: string) {
      const listIndex: number = this.getListIndexByTaskId(id);
      const taskIndex: number = this.getCurrentTaskIndex(id);
      this.currentBoardLists[listIndex].tasks[taskIndex].name = name;
    },
    /**
     * Изменяет данные задачи, имя и подробное описание
     * @param id - id редактируемой задачи
     * @param name - имя редактируемой задачи
     * @param description - подробное описание редактируемой задачи
     */
    editTask(id: number, name: string, description: string): void {
      const listIndex: number = this.getListIndexByTaskId(id);
      const taskIndex: number = this.getCurrentTaskIndex(id);
      this.currentBoardLists[listIndex].tasks[taskIndex].name = name;
      this.currentBoardLists[listIndex].tasks[taskIndex].description =
        description;
    },
    /**
     * Удаляет задачу из массива списка tasks задачу
     * @param id - удаляемой задачи
     */
    deleteTask(id: number): void {
      const listIndex: number = this.getListIndexByTaskId(id);
      const taskIndex: number = this.getCurrentTaskIndex(id);
      this.currentBoardLists[listIndex].tasks.splice(taskIndex, 1);
    },
    /**
     * Отображает или скрывает инпут для изменения имени задачи
     * @param id - id выбранной задачи
     */
    showTaskInput(id: number): void {
      const listIndex: number = this.getListIndexByTaskId(id);
      const taskIndex: number = this.getCurrentTaskIndex(id);
      this.currentBoardLists[listIndex].tasks[taskIndex].isShowInput =
        !this.currentBoardLists[listIndex].tasks[taskIndex].isShowInput;
    },
  },
});
