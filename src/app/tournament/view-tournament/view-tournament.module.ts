import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from '@shared/shared.module';
import { TournamentModule } from '@tournament/tournament.module';
import { ClassicTableComponent } from './classic-table/classic-table.component';
import { EliminationTableComponent } from './elimination-table/elimination-table.component';
import { GeneralComponent } from './general/general.component';
import { RoundRobinTableComponent } from './round-robin-table/round-robin-table.component';
import { TournamentGroupsComponent } from './tournament-groups/tournament-groups.component';
import { TournamentMatchComponent } from './tournament-match/tournament-match.component';
import { TournamentTableComponent } from './tournament-table/tournament-table.component';
import { ViewTournamentRoutingModule } from './view-tournament-routing.module';
import { ViewTournamentComponent } from './view-tournament.component';

@NgModule({
  declarations: [
    ViewTournamentComponent,
    GeneralComponent,
    TournamentTableComponent,
    TournamentGroupsComponent,
    ClassicTableComponent,
    RoundRobinTableComponent,
    EliminationTableComponent,
    TournamentMatchComponent,
  ],
  imports: [
    CommonModule,
    ViewTournamentRoutingModule,
    SharedModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatTabsModule,
    TournamentModule,
    MatTableModule,
    MatDividerModule,
    MatCardModule,
  ],
})
export class ViewTournamentModule { }
