import User from '@app/models/user.model';

export default class Team {
  public id: number;
  public name: string;
  public users: User[];
  public userId: number;

  constructor(init: any = {}) {
    Object.assign(this, init);

    this.users = init.users ? init.users.map((user: any) => new User(user)) : [];
  }
}
