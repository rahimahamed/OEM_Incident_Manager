import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ArchivedIncidentsComponent } from './incident-components/archived-incidents/archived-incidents.component';
import { UserCreateComponent } from './user-components/user-create/user-create.component';
import { UserLoginComponent } from './user-components/user-login/user-login.component';
import { UserProfileComponent } from './user-components/user-profile/user-profile.component';
import { AuthGuard } from './helpers/auth.guard';
import { IncidentDetailsComponent } from './incident-components/incident-details/incident-details.component';
import { IncidentMapComponent } from './incident-components/incident-map/incident-map.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'archive', component: ArchivedIncidentsComponent },
  { path: 'register', component: UserCreateComponent },
  { path: 'login', component: UserLoginComponent },
  { path: 'profile', component: UserProfileComponent }
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