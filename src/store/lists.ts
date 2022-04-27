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
     * Изменяет параметр name задачи
     * @param id - id редактируемой задачи
     * @param name - новое имя редактируемой задачи
     */
    editTaskName(id: number, name: string): void {
      const index = this.findTask(id);
      this.lists[index[0]].tasks[index[1]].name = name;
    },
    /**
     * Удаляет задачу из массива списка tasks задачу
     * @param id - удаляемой задачи
     */
    deleteTask(id: number): void {
      const index = this.findTask(id);
      this.lists[index[0]].tasks.splice(index[1], 1);
    },
    /**
     * Открывает модальное окно с данными задачи
     * @param id - id задачи для которой открывается модальное окно
     * @return {Array<string>} - возвращает массив строк, содержащий имя и подробное описание задачи
     */
    openTask(id: number): Array<string> {
      const index = this.findTask(id);
      const taskName = this.lists[index[0]].tasks[index[1]].name;
      const taskDescription = this.lists[index[0]].tasks[index[1]].description;
      return [taskName, taskDescription];
    },
    /**
     * Изменяет данные задачи, имя и подробное описание
     * @param id - id редактируемой задачи
     * @param name - имя редактируемой задачи
     * @param description - подробное описание редактируемой задачи
     */
    editTask(id: number, name: string, description: string): void {
      const index = this.findTask(id);
      this.lists[index[0]].tasks[index[1]].name = name;
      this.lists[index[0]].tasks[index[1]].description = description;
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
    /**
     * Находит индексы списка и задачи по id списка
     * @param id - id выбранного списка
     * @return {Array<number>} - возвращает массив из чисел, содержащий индекс списка и индекс выбранной задачи
     */
    findTask(id: number): Array<number> {
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
