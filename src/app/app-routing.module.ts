import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ArchivedIncidentsComponent } from './archived-incidents/archived-incidents.component';
import { IncidentMapComponent } from './incident-map/incident-map.component';
import { LogisticsDataComponent } from './logistics-data/logistics-data.component';
import { UserCreateComponent } from './user-components/user-create/user-create.component';
import { UserLoginComponent } from './user-components/user-login/user-login.component';
import { UserProfileComponent } from './user-components/user-profile/user-profile.component';
import { AuthGuard } from './auth.guard.service';
import { IncidentDetailsComponent } from './incident-details/incident-details.component';
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'archive', component: ArchivedIncidentsComponent },
  { path: 'map', component: IncidentMapComponent },
  { path: 'register', component: UserCreateComponent },
  { path: 'login', component: UserLoginComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'logistics', component: LogisticsDataComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
export const routingComponents = [
  HomeComponent,
  ArchivedIncidentsComponent,
  UserCreateComponent,
  UserLoginComponent,
  UserProfileComponent,
  IncidentDetailsComponent
];
