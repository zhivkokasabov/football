import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateGuard } from '@app/services/can-activate.service';
import { CanDeactivateGuard } from '@app/services/can-deactivate.service';
import { ViewTeamComponent } from '@team/components/view-team/view-team.component';
import { TeamResolver } from '@team/resolvers/team.resolver';
import { EditTeamComponent } from './components/edit-team/edit-team.component';
import { GeneralComponent } from './components/general/general.component';
import { TeamMatchesComponent } from './components/team-matches/team-matches.component';
import { TeamComponent } from './team.component';

const routes: Routes = [
  {
    canActivate: [CanActivateGuard],
    canDeactivate: [CanDeactivateGuard],
    component: TeamComponent,
    path: '',
    pathMatch: 'full',
  },
  {
    canActivate: [CanActivateGuard],
    children: [
      { path: 'general', component: GeneralComponent },
      { path: 'edit', component: EditTeamComponent },
      { path: 'matches', component: TeamMatchesComponent },
    ],
    component: ViewTeamComponent,
    path: ':id',
    resolve : { team: TeamResolver },
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class TeamRoutingModule { }
