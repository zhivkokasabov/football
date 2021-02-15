import { Component, Input} from '@angular/core';
import Team from '@teams/models/team.model';

@Component({
  selector: 'app-team-card',
  styleUrls: ['./team-card.component.scss'],
  templateUrl: './team-card.component.html',
})
export class TeamCardComponent {
  @Input() public team: Team;

  constructor() { }
}
