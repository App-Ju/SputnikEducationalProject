import Task from "@/models/Task.model";

export default class List {
  boardId: number;
  id: number;
  name: string;
  tasks: Task[];
  isShowInput: boolean;

  constructor(
    boardId: number,
    id: number,
    name: string,
    tasks: Task[],
    isShowInput: boolean
  ) {
    this.boardId = boardId;
    this.id = id;
    this.name = name;
    this.tasks = tasks;
    this.isShowInput = isShowInput;
  }
}
