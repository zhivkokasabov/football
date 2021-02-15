import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TournamentComponent } from './tournament.component';
import { ViewTournamentComponent } from './view-tournament/view-tournament.component';

const routes: Routes = [
  { path: '', component: TournamentComponent },
  { path: ':id/view', component: ViewTournamentComponent },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class TournamentRoutingModule { }
