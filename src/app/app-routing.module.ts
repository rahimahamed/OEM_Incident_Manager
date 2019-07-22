import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { IncidentDetailsComponent } from './incident-details/incident-details.component';
import { ArchivedIncidentsComponent } from './archived-incidents/archived-incidents.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'incident-details/:name', component: IncidentDetailsComponent},
  {path: 'incident-details', component: IncidentDetailsComponent},
  {path: 'archive', component: ArchivedIncidentsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
export const routingComponents = [HomeComponent, IncidentDetailsComponent, ArchivedIncidentsComponent]
