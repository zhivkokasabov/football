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
import { TeamFormComponent } from './team-form/team-form.component';
import { TeamRoutingModule } from './team-routing.module';
import { TeamComponent } from './team.component';
import { ViewTeamComponent } from './view-team/view-team.component';

@NgModule({
  declarations: [TeamComponent, TeamFormComponent, ViewTeamComponent],
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
