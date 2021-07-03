export default class TournamentType {
  public id: number;
  public name: string;

  constructor(init: any = {}) {
    this.id = init.id;
    this.name = init.name;
  }
}
