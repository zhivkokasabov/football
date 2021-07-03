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
  public sequenceId: number;
  public winner: any;

  constructor(init: any = {}) {
    Object.assign(this, init);

    this.date = new Date(init.date).toLocaleDateString('en-gb', {  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    if (init.tournamentMatchTeams.length) {
      const homeTeam = init.tournamentMatchTeams.find((x: any) => x.isHomeTeam);
      const awayTeam = init.tournamentMatchTeams.find((x: any) => !x.isHomeTeam);

      this.homeTeam = homeTeam || { name: `Team ${init.homeTeamSequenceId}` };
      this.awayTeam = awayTeam || { name: `Team ${init.awayTeamSequenceId}` };
    }
  }
}
