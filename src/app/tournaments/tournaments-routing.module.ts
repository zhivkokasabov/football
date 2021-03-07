import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TournamentsComponent } from './tournaments.component';

const routes: Routes = [
  { path: '', component: TournamentsComponent },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class TournamentsRoutingModule { }
