import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateGuard } from '@app/services/can-activate.service';
import { TeamsComponent } from './teams.component';

const routes: Routes = [
  { path: '', component: TeamsComponent, canActivate: [CanActivateGuard] },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class TeamsRoutingModule { }
