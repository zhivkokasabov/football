import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateGuard } from '@app/services/can-activate.service';
import { CanDeactivateGuard } from '@app/services/can-deactivate.service';
import { EditTournamentComponent } from '@tournament/components/edit-tournament/edit-tournament.component';
import { GeneralComponent } from '@tournament/components/general/general.component';
import { TournamentGroupsComponent } from '@tournament/components/tournament-groups/tournament-groups.component';
import { TournamentTableComponent } from '@tournament/components/tournament-table/tournament-table.component';
import { ViewTournamentComponent } from '@tournament/components/view-tournament/view-tournament.component';
import { TournamentAccessesResolver } from '@tournament/resolvers/tournament-accesses.resolver';
import { TournamentTypesResolver } from '@tournament/resolvers/tournament-types.resolver';
import { TournamentResolver } from '@tournament/resolvers/tournament.resolver';
import { TournamentComponent } from '@tournament/tournament.component';

const routes: Routes = [
  {
    canActivate: [CanActivateGuard],
    canDeactivate: [CanDeactivateGuard],
    component: TournamentComponent,
    path: '',
    pathMatch: 'full',
    resolve : {
      accesses: TournamentAccessesResolver,
      types: TournamentTypesResolver,
    },
  },
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
      { path: 'table', component: TournamentTableComponent },
      { path: 'groups', component: TournamentGroupsComponent },
      { path: 'edit', canDeactivate: [CanDeactivateGuard], component: EditTournamentComponent },
    ],
    component: ViewTournamentComponent,
    path: ':id',
    resolve: { tournament: TournamentResolver },
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class TournamentRoutingModule { }
