export default class TournamentMatch {
  public tournamentId: number;
  public homeTeamSequenceId: number;
  public awayTeamSequenceId: number;
  public homeTeamId: number;
  public awayTeamId: number;
  public startTime: string;
  public date: string;
  public round: number;
  public group: string;
  public homeTeam: any;
  public awayTeam: any;

  constructor(init: any = {}) {
    Object.assign(this, init);

    if (!init.homeTeam) {
      this.homeTeam = { name: `Team ${init.homeTeamSequenceId}` };
    }

    if (!init.awayTeam) {
      this.awayTeam = { name: `Team ${init.awayTeamSequenceId}` };
    }
  }
}
