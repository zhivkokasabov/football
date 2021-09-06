import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateGuard } from '@app/services/can-activate.service';
import { NotificationsComponent } from '@notifications/notifications.component';

const routes: Routes = [
  {
    canActivate: [CanActivateGuard],
    component: NotificationsComponent,
    path: '',
    pathMatch: 'full',
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class NotificationRoutingModule { }
