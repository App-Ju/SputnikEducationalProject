export default class Task {
  id: number;
  name: string;
  description: string;
  isShowInput: boolean;

  constructor(
    id: number,
    name: string,
    description: string,
    isShowInput: boolean
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.isShowInput = isShowInput;
  }
}
