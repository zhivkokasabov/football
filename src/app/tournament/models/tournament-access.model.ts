export default class TournamentAccess {
  public id: number;
  public access: string;

  constructor(init: any = {}) {
    this.id = init.id;
    this.access = init.access;
  }
}
