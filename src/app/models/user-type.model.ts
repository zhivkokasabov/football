export default class UserTypes {
  public id: number;
  public type: string;

  constructor(init: any = {}) {
    this.id = init.id;
    this.type = init.type;
  }
}
