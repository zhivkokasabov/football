export default class TournamentMatch {
  public tournamentMatchId: number;
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
  public sequenceId: number;
  public winner: any;
  public result: string;
  public isEliminationMatch: boolean;

  constructor(init: any = {}) {
    Object.assign(this, init);

    if (init.tournamentMatchTeams.length) {
      const homeTeam = init.tournamentMatchTeams.find((x: any) => x.isHomeTeam)?.team;
      const awayTeam = init.tournamentMatchTeams.find((x: any) => !x.isHomeTeam)?.team;

      this.homeTeam = homeTeam || { name: `Team ${init.homeTeamSequenceId}` };
      this.awayTeam = awayTeam || { name: `Team ${init.awayTeamSequenceId}` };
      this.homeTeamId = this.homeTeam.id;
      this.awayTeamId = this.awayTeam.id;
    } else {
      this.homeTeam = { name: `Team ${init.homeTeamSequenceId}` };
      this.awayTeam = { name: `Team ${init.awayTeamSequenceId}` };
      this.homeTeamId = 0;
      this.awayTeamId = 0;
    }
  }
}
