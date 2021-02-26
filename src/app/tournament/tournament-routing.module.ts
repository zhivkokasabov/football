import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateGuard } from '@app/services/can-activate.service';
import { CanDeactivateGuard } from '@app/services/can-deactivate.service';
import { TournamentComponent } from './tournament.component';

const routes: Routes = [
  { path: '', component: TournamentComponent, canActivate: [CanActivateGuard] },
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
