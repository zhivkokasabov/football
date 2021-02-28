import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { ColorLegendComponent } from './color-legend/color-legend.component';
import { NoContentComponent } from './no-content/no-content.component';
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
    ColorLegendComponent,
    NoContentComponent,
  ],
  exports: [
    OrganisatorFormComponent,
    PlayerFormComponent,
    PageHeaderComponent,
    TournamentCardComponent,
    ColorLegendComponent,
    NoContentComponent,
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
    MatIconModule,
  ],
})
export class SharedModule { }
