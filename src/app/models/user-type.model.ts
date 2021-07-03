export default class UserTypes {
  public roleId: number;
  public name: string;

  constructor(init: any = {}) {
    this.roleId = init.roleId;
    this.name = init.name;
  }

  public output(): any {
    return {
      id: this.roleId,
      name: this.name,
    };
  }
}
