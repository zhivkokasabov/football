import User from '@app/models/user.model';

export default class Team {
  public id: number;
  public name: string;
  public members: User[];

  constructor(init: any = {}) {
    const team = init || {};
    Object.assign(this, team);

    this.members = team.members ? team.members.map((member: any) => new User(member)) : [];
  }
}
