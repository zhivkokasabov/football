import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateGuard } from '@app/services/can-activate.service';
import { CanDeactivateGuard } from '@app/services/can-deactivate.service';
import { TournamentAccessesResolver } from '@tournament/resolvers/tournament-accesses.resolver';
import { TournamentTypesResolver } from '@tournament/resolvers/tournament-types.resolver';
import { ViewTournamentComponent } from '@view-tournament/view-tournament.component';
import { GeneralComponent } from './general/general.component';
import { TournamentGroupsComponent } from './tournament-groups/tournament-groups.component';
import { TournamentTableComponent } from './tournament-table/tournament-table.component';

const routes: Routes = [
  {
    canActivate: [CanActivateGuard],
    children: [
      {
        canActivate: [CanActivateGuard],
        component: GeneralComponent,
        path: 'general',
        resolve : {
          accesses: TournamentAccessesResolver,
          types: TournamentTypesResolver,
        },
      },
      { path: 'table', component: TournamentTableComponent, canActivate: [CanActivateGuard] },
      { path: 'groups', component: TournamentGroupsComponent, canActivate: [CanActivateGuard] },
    ],
    component: ViewTournamentComponent,
    path: '',
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class ViewTournamentRoutingModule { }
