import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateGuard } from '../services/can-activate.service';
import { CanDeactivateGuard } from '../services/can-deactivate.service';
import { MessagesComponent } from './messages/messages.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ProfileComponent } from './profile.component';
import { TournamentsComponent } from './tournaments/tournaments.component';
import { ViewEditProfileComponent } from './view-edit-profile/view-edit-profile.component';

const routes: Routes = [
  {
    children: [
      { canDeactivate: [CanDeactivateGuard], path: 'user-settings', component: ViewEditProfileComponent },
      {
        canActivate: [CanActivateGuard],
        loadChildren: () => import('./tournaments/tournaments.module').then((m) => m.TournamentsModule),
        path: 'tournaments',
      },
      { path: 'notifications', component: NotificationsComponent },
      { path: 'messages', component: MessagesComponent },
    ],
    component: ProfileComponent,
    path: '',
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class ProfileRoutingModule { }
