import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '@app/components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CanActivateGuard } from './services/can-activate.service';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  {
    canActivate: [CanActivateGuard],
    loadChildren: () => import('./profile/profile.module').then((m) => m.ProfileModule),
    path: 'profile/:id',
  },
  {
    canActivate: [CanActivateGuard],
    loadChildren: () => import('./tournaments/tournaments.module').then((m) => m.TournamentsModule),
    path: 'tournaments',
  },
  {
    canActivate: [CanActivateGuard],
    loadChildren: () => import('./tournament/tournament.module').then((m) => m.TournamentModule),
    path: 'tournament',
  },
  {
    canActivate: [CanActivateGuard],
    loadChildren: () => import('./teams/teams.module').then((m) => m.TeamsModule),
    path: 'teams',
  },
  {
    canActivate: [CanActivateGuard],
    loadChildren: () => import('./team/team.module').then((m) => m.TeamModule),
    path: 'team',
  },
  {
    canActivate: [CanActivateGuard],
    loadChildren: () => import('./notifications/notifications.module').then((m) => m.NotificationsModule),
    path: 'notifications',
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule { }
