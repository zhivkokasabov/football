import { Component, Input } from '@angular/core';
import TournamentPlacement from '@team/models/tournament-placement.model';

@Component({
  selector: 'app-placements-table',
  styleUrls: ['./placements-table.component.scss'],
  templateUrl: './placements-table.component.html',
})
export class PlacementsTableComponent {
  @Input() public placements: TournamentPlacement[] = [];
  public displayedColumns = ['date', 'name', 'place'];

  constructor() { }
}
