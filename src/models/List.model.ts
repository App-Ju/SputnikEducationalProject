import Task from "@/models/Task.model";

export default class List {
  boardId: number;
  id: number;
  name: string;
  tasks: Task[];

  constructor(boardId: number, id: number, name: string, tasks: Task[]) {
    this.boardId = boardId;
    this.id = id;
    this.name = name;
    this.tasks = tasks;
  }
}
