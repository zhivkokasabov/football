import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from '@shared/shared.module';
import { EditTeamComponent } from './components/edit-team/edit-team.component';
import { GeneralComponent } from './components/general/general.component';
import { PlacementsTableComponent } from './components/placements-table/placements-table.component';
import { TeamFormComponent } from './components/team-form/team-form.component';
import { TeamMatchesComponent } from './components/team-matches/team-matches.component';
import { ViewTeamComponent } from './components/view-team/view-team.component';
import { TeamRoutingModule } from './team-routing.module';
import { TeamComponent } from './team.component';

@NgModule({
  declarations: [
    TeamComponent,
    TeamFormComponent,
    ViewTeamComponent,
    GeneralComponent,
    EditTeamComponent,
    TeamMatchesComponent,
    PlacementsTableComponent,
  ],
  imports: [
    CommonModule,
    TeamRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatTabsModule,
    MatTableModule,
  ],
})
export class TeamModule { }
