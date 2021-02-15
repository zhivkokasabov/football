import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { OrganisatorFormComponent } from './organisator-form/organisator-form.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { PlayerFormComponent } from './player-form/player-form.component';
import { TournamentCardComponent } from './tournament-card/tournament-card.component';

@NgModule({
  declarations: [
    PlayerFormComponent,
    OrganisatorFormComponent,
    PageHeaderComponent,
    TournamentCardComponent,
  ],
  exports: [
    OrganisatorFormComponent,
    PlayerFormComponent,
    PageHeaderComponent,
    TournamentCardComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatButtonToggleModule,
  ],
})
export class SharedModule { }
