export default class TournamentParticipant {
  public tournamentId: number;
  public teamId: number;
  public team: any;
  public teamSequenceId: number;
  public group: string;
  public id: number;

  constructor(init: any = {}) {
    Object.assign(this, init);
  }
}
