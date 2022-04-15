export default class Board {
  id: number;
  name: string;
  isFavorite: boolean;

  constructor(id: number, name: string, isFavorite: boolean) {
    this.id = id;
    this.name = name;
    this.isFavorite = isFavorite;
  }
}
