import PlayerPosition from './player-position.model';
import UserType from './user-type.model';

export default class User {
  public id: number;
  public email: string;
  public firstName: string;
  public lastName: string;
  public nickname: string;
  public password: string;
  public roles: UserType[];
  public positions: PlayerPosition[];
  public isTeamCaptain: boolean;

  constructor(init: any = {}) {
    this.id = init.id;
    this.email = init.email;
    this.firstName = init.firstName;
    this.lastName = init.lastName;
    this.nickname = init.nickname;
    this.password = init.password;
    this.isTeamCaptain = init.isTeamCaptain;
    this.roles = init.roles ? init.roles.map((x: any) => new UserType(x)) : [];
    this.positions = init.positions ? init.positions.map((x: any) => new PlayerPosition(x)) : [];
  }
}
