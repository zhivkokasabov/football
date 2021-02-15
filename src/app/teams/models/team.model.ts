import User from '@app/models/user.model';

export default class Team {
  public id: number;
  public name: string;
  public members: User[];
  public entryKey: string;

  constructor(init: any = {}) {
    Object.assign(this, init);

    this.members = init.members ? init.members.map((member: any) => new User(member)) : [];
  }
}
