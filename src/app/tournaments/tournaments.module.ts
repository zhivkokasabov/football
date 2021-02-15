import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '@shared/shared.module';
import { TournamentsRoutingModule } from './tournaments-routing.module';
import { TournamentsComponent } from './tournaments.component';

@NgModule({
  declarations: [ TournamentsComponent],
  imports: [
    CommonModule,
    TournamentsRoutingModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    SharedModule,
  ],
})
export class TournamentsModule { }
