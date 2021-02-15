import Base from '@app/models/Base.model';

export default class MatchScore extends Base {
  public homeTeamScore: number;
  public awayTeamScore: number;

  constructor(init: any = {}) {
    super(init);
  }
}
