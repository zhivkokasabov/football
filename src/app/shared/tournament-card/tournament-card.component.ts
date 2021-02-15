import { Component, Input} from '@angular/core';
import Tournament from '@tournament/models/tournament.model';

@Component({
  selector: 'app-tournament-card',
  styleUrls: ['./tournament-card.component.scss'],
  templateUrl: './tournament-card.component.html',
})
export class TournamentCardComponent {
  @Input() public tournament: Tournament;

  constructor() { }
}
