import Base from '@app/models/Base.model';

export default class PlayerPosition extends Base {
  public id: number;
  public name: string;

  constructor(init: any = {}) {
    const playerPosition = init || {};

    super(playerPosition);

    this.name = playerPosition.position;
  }
}
