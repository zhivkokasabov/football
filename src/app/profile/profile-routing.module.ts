import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateGuard } from '../services/can-activate.service';
import { CanDeactivateGuard } from '../services/can-deactivate.service';
import { MessagesComponent } from './messages/messages.component';
import { ProfileComponent } from './profile.component';
import { ViewEditProfileComponent } from './view-edit-profile/view-edit-profile.component';

const routes: Routes = [
  {
    children: [
      { canDeactivate: [CanDeactivateGuard], path: 'user-settings', component: ViewEditProfileComponent },
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
