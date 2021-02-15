import Base from '@app/models/Base.model';

export default class Tournament extends Base {
  public avenue: string;
  public description: string;
  public endDate: Date | string;
  public halfTimeLength: number;
  public id: number;
  public latestMatchStart: string;
  public matchLength: number;
  public name: string;
  public playingFields: number;
  public rules: string;
  public startDate: Date | string;
  public teamsCount: number;
  public userId: number;

  constructor(init: any = {}) {
    super();

    this.avenue = init.avenue;
    this.description = init.description;
    this.endDate = init.endDate;
    this.halfTimeLength = init.halfTimeLength;
    this.id = init.id;
    this.latestMatchStart = init.id;
    this.matchLength = init.matchLength;
    this.name = init.name;
    this.playingFields = init.playingFields;
    this.rules = init.rules;
    this.startDate = init.startDate;
    this.teamsCount = init.teamsCount;
    this.userId = init.userId;
  }
}
