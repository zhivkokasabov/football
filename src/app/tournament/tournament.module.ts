import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { ClassicTableComponent } from '@tournament/components/classic-table/classic-table.component';
import { EditTournamentComponent } from '@tournament/components/edit-tournament/edit-tournament.component';
import { EliminationTableComponent } from '@tournament/components/elimination-table/elimination-table.component';
import { GeneralComponent } from '@tournament/components/general/general.component';
import { RoundRobinTableComponent } from '@tournament/components/round-robin-table/round-robin-table.component';
import { TournamentFormComponent } from '@tournament/components/tournament-form/tournament-form.component';
import { TournamentGroupsComponent } from '@tournament/components/tournament-groups/tournament-groups.component';
import { TournamentTableComponent } from '@tournament/components/tournament-table/tournament-table.component';
import { ViewTournamentComponent } from '@tournament/components/view-tournament/view-tournament.component';
import { TournamentRoutingModule } from '@tournament/tournament-routing.module';
import { TournamentComponent } from '@tournament/tournament.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

@NgModule({
  declarations: [
    TournamentComponent,
    TournamentFormComponent,
    ViewTournamentComponent,
    ClassicTableComponent,
    EliminationTableComponent,
    GeneralComponent,
    RoundRobinTableComponent,
    TournamentTableComponent,
    GeneralComponent,
    TournamentGroupsComponent,
    TournamentTableComponent,
    EditTournamentComponent,
  ],
  imports: [
    CommonModule,
    TournamentRoutingModule,
    SharedModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    MatTooltipModule,
    MatMomentDateModule,
    ReactiveFormsModule,
    MatRadioModule,
    NgxMaterialTimepickerModule,
    MatCardModule,
    MatDividerModule,
    MatTableModule,
    MatTabsModule,
    RouterModule,
  ],
})
export class TournamentModule { }
