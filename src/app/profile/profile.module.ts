import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from '../shared/shared.module';
import { MessagesComponent } from './messages/messages.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { ViewEditProfileComponent } from './view-edit-profile/view-edit-profile.component';

@NgModule({
  declarations: [ProfileComponent, ViewEditProfileComponent, NotificationsComponent, MessagesComponent],
  entryComponents: [],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatTabsModule,
    MatIconModule,
  ],
})
export class ProfileModule { }
