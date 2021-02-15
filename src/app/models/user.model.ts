import PlayerPosition from './player-position.model';
import UserType from './user-type.model';

export default class User {
  public id: number;
  public email: string;
  public firstName: string;
  public lastName: string;
  public nickname: string;
  public password: string;
  public userTypeId: number;
  public playerPositionId: number;
  public playerPosition: PlayerPosition;
  public userType: UserType;

  constructor(init: any = {}) {
    this.id = init.id;
    this.email = init.email;
    this.firstName = init.firstName;
    this.lastName = init.lastName;
    this.nickname = init.nickname;
    this.password = 'random password';
    this.userTypeId = init.userType?.id;
    this.playerPositionId = init.playerPosition?.id;
    this.playerPosition = new PlayerPosition(init.playerPosition);
    this.userType = new UserType(init.userType);
  }
}
