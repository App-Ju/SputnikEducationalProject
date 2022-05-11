export default class Board {
  id: number;
  name: string;
  isFavorite: boolean;
  isShowInput: boolean;

  constructor(
    id: number,
    name: string,
    isFavorite: boolean,
    isShowInput: boolean
  ) {
    this.id = id;
    this.name = name;
    this.isFavorite = isFavorite;
    this.isShowInput = isShowInput;
  }
}
