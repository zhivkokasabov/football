import Base from '@app/models/Base.model';
import TournamentAccess from '@tournament/models/tournament-access.model';
import TournamentType from '@tournament/models/tournament-type.model';

export default class Tournament extends Base {
  public avenue: string;
  public description: string;
  public endDate: Date | string;
  public halfTimeLength: number;
  public id: number;
  public firstMatchStartsAt: string;
  public matchLength: number;
  public name: string;
  public playingFields: number;
  public rules: string;
  public startDate: Date | string;
  public teamsCount: number;
  public userId: number;
  public groupSize: number;
  public playingDays: number;
  public teamsAdvancingAfterGroups: number;
  public type: TournamentType;
  public access: TournamentAccess;
  public typeId: number;
  public accessId: number;

  constructor(init: any = {}) {
    super();

    this.avenue = init.avenue;
    this.description = init.description;
    this.endDate = init.endDate;
    this.halfTimeLength = init.halfTimeLength;
    this.id = init.id;
    this.firstMatchStartsAt = init.firstMatchStartsAt;
    this.matchLength = init.matchLength;
    this.name = init.name;
    this.playingFields = init.playingFields;
    this.rules = init.rules;
    this.startDate = init.startDate;
    this.teamsCount = init.teamsCount;
    this.userId = init.userId;
    this.groupSize = init.groupSize;
    this.playingDays = init.playingDays;
    this.teamsAdvancingAfterGroups = init.teamsAdvancingAfterGroups;
    this.type = new TournamentType(init.type);
    this.access = new TournamentAccess(init.access);
    this.typeId = init.typeId;
    this.accessId = init.accessId;
  }
}
