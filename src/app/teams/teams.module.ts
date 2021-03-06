import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { TeamsRoutingModule } from './teams-routing.module';
import { TeamsComponent } from './teams.component';

@NgModule({
  declarations: [TeamsComponent],
  imports: [
    CommonModule,
    TeamsRoutingModule,
    SharedModule,
  ],
})
export class TeamsModule { }
