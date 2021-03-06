export default class Team {
  public id: number;
  public name: string;

  constructor(init: any = {}) {
    Object.assign(this, init);
  }
}
