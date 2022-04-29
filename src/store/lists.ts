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
    getListIndexByTaskId(lists) {
      return (taskId: number) =>
        this.lists.findIndex((el) => el.tasks.find((el) => el.id === taskId));
    },
    /**
     * Находит выбранную задачу по id, возвращает
     * @return number - возвращает индекс задачи
     */
    getCurrentTaskIndex(lists) {
      return (taskId: number) =>
        this.lists[this.getListIndexByTaskId(taskId)].tasks.findIndex(
          (el) => el.id === taskId
        );
    },
    /**
     * Получает данные выбанной задачи
     * @return {} - возвращает объект с выбранной задачей
     */
    getCurrentTaskData(lists) {
      return (taskId: number) =>
        this.lists[this.getListIndexByTaskId(taskId)].tasks[
          this.getCurrentTaskIndex(taskId)
        ];
    },
  },
  actions: {
    /**
     * Добавляет в стейт lists инстанс класса List
     * @param boardId - id доски к которой пивязан список
     * @param id - id добавляемого списка задач
     * @param name - имя добавляемого списка задач
     */
    addListName(boardId: number, id: number, name: string): void {
      this.lists.push(new List(boardId, id, name, []));
    },
    /**
     * Изменяет параметр name списка задач
     * @param id - id редактируемого списка
     * @param name - новое имя редактируемого списка
     */
    editListName(id: number, name: string): void {
      const index = this.lists.findIndex((el) => el.id === id);
      this.lists[index].name = name;
    },
    /**
     * Удаяет список из стейта lists
     * @param id - id удаляемого списка
     */
    deleteList(id: number): void {
      const index = this.lists.findIndex((el) => el.id === id);
      this.lists.splice(index, 1);
    },
    /**
     * Добавляет в массив списка tasks иснтанс класса Task
     * @param listId - id списка, которому добавляется задача
     * @param id - id добавляемой задачи
     * @param name - имя добавляемой задачи
     */
    addTaskName(listId: number, id: number, name: string): void {
      const index = this.lists.findIndex((el) => el.id === listId);
      this.lists[index].tasks.push(new Task(id, name, ""));
    },
    /**
     * Изменяет данные задачи, имя и подробное описание
     * @param id - id редактируемой задачи
     * @param name - имя редактируемой задачи
     * @param description - подробное описание редактируемой задачи
     */
    editTask(id: number, name: string, description: string): void {
      const listIndex = this.getListIndexByTaskId(id);
      const taskIndex = this.getCurrentTaskIndex(id);
      this.lists[listIndex].tasks[taskIndex].name = name;
      this.lists[listIndex].tasks[taskIndex].description = description;
    },
    /**
     * Удаляет задачу из массива списка tasks задачу
     * @param id - удаляемой задачи
     */
    deleteTask(id: number): void {
      const listIndex = this.getListIndexByTaskId(id);
      const taskIndex = this.getCurrentTaskIndex(id);
      this.lists[listIndex].tasks.splice(taskIndex, 1);
    },
    /**
     * Формирует из спсиков стйет currentBoardLists для выбранной доски
     * @param boardId - id доски для которой формируется стейт
     */
    showCurrentBoardStore(boardId: number): void {
      this.currentBoardLists = this.lists.filter(
        (el) => el.boardId === boardId
      );
    },
  },
});
