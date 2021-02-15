import { Component, Input, OnInit } from '@angular/core';
import User from '@app/models/user.model';

@Component({
  selector: 'app-player-card',
  styleUrls: ['./player-card.component.scss'],
  templateUrl: './player-card.component.html',
})
export class PlayerCardComponent implements OnInit {
  @Input() public player: User;

  constructor() { }

  public ngOnInit(): void {
  }
}
