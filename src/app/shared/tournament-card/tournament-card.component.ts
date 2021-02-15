import { Component, Input, OnInit } from '@angular/core';
import Tournament from '@tournament/models/tournament.model';

@Component({
  selector: 'app-tournament-card',
  styleUrls: ['./tournament-card.component.scss'],
  templateUrl: './tournament-card.component.html',
})
export class TournamentCardComponent implements OnInit {
  @Input() public tournament: Tournament;

  constructor() { }

  public ngOnInit(): void {
  }

}
