import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from '@shared/shared.module';
import { EditTeamComponent } from './components/edit-team/edit-team.component';
import { GeneralComponent } from './components/general/general.component';
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
  ],
  imports: [
    CommonModule,
    TeamRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatTabsModule,
  ],
})
export class TeamModule { }
