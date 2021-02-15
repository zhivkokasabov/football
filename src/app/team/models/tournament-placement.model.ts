export default class TournamentPlacement {
  public placement: string;
  public startDate: Date;
  public name: string;

  constructor(init: any = {}) {
    Object.assign(this, init);
  }
}
