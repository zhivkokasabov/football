import User from '@app/models/user.model';

export default class Team {
  public id: number;
  public name: string;
  public users: User[];

  constructor(init: any = {}) {
    Object.assign(this, init);

    this.users = init.users ? init.users.map((user: any) => new User(user)) : [];
  }
}
