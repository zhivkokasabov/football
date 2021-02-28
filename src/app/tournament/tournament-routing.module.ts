import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateGuard } from '@app/services/can-activate.service';
import { CanDeactivateGuard } from '@app/services/can-deactivate.service';
import { TournamentAccessesResolver } from '@tournament/resolvers/tournament-accesses.resolver';
import { TournamentTypesResolver } from '@tournament/resolvers/tournament-types.resolver';
import { TournamentComponent } from './tournament.component';
const routes: Routes = [
  {
    canActivate: [CanActivateGuard],
    component: TournamentComponent,
    path: '',
    resolve : {
      accesses: TournamentAccessesResolver,
      types: TournamentTypesResolver,
    },
  },
  {
    canActivate: [CanActivateGuard],
    loadChildren: () => import('./view-tournament/view-tournament.module').then((m) => m.ViewTournamentModule),
    path: ':id/view',
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class TournamentRoutingModule { }
