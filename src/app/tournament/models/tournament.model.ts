import Base from '@app/models/Base.model';
import TournamentAccess from '@tournament/models/tournament-access.model';
import TournamentType from '@tournament/models/tournament-type.model';

export default class Tournament extends Base {
  public avenue: string;
  public description: string;
  public endDate: Date | string;
  public halfTimeLength: number;
  public tournamentId: number;
  public firstMatchStartsAt: string;
  public matchLength: number;
  public name: string;
  public playingFields: number;
  public rules: string;
  public startDate: Date | string;
  public teamsCount: number;
  public userId: number;
  public groupSize: number;
  public playingDaysId: number;
  public teamsAdvancingAfterGroups: number;
  public type: TournamentType;
  public access: TournamentAccess;
  public tournamentTypeId: number;
  public tournamentAccessId: number;
  public enrolledTeams: number;
  public canEdit: boolean;
  public canEditMatches: boolean;
  public eliminationPhaseStarted: boolean;

  constructor(init: any = {}) {
    super(init);

    this.type = new TournamentType(init.type);
    this.access = new TournamentAccess(init.access);
  }
}
