import { Component, Input, OnInit } from '@angular/core';
import TournamentMatch from '@tournament/models/tournament-match.model';

@Component({
  selector: 'app-tournament-match',
  styleUrls: ['./tournament-match.component.scss'],
  templateUrl: './tournament-match.component.html',
})
export class TournamentMatchComponent implements OnInit {
  @Input() public match: TournamentMatch;

  constructor() { }

  public ngOnInit(): void {
  }
}
