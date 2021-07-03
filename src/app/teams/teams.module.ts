import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from '@shared/shared.module';
import { TeamsRoutingModule } from './teams-routing.module';
import { TeamsComponent } from './teams.component';

@NgModule({
  declarations: [TeamsComponent],
  imports: [
    CommonModule,
    TeamsRoutingModule,
    SharedModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
})
export class TeamsModule { }
