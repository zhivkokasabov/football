import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateGuard } from '@app/services/can-activate.service';
import { CanDeactivateGuard } from '@app/services/can-deactivate.service';
import { ViewTeamComponent } from '@team/view-team/view-team.component';
import { TeamComponent } from './team.component';

const routes: Routes = [
  { path: '', component: TeamComponent, canActivate: [CanActivateGuard], canDeactivate: [CanDeactivateGuard] },
  {
    canActivate: [CanActivateGuard],
    children: [
      { path: 'view', component: TeamComponent },
      { path: 'tournaments', component: TeamComponent },
      { path: 'results', component: TeamComponent },
    ],
    component: ViewTeamComponent,
    path: ':id',
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class TeamRoutingModule { }
