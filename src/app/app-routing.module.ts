import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ArchivedIncidentsComponent } from './archived-incidents/archived-incidents.component';
import { IncidentMapComponent } from './incident-map/incident-map.component';


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'archive', component: ArchivedIncidentsComponent},
  {path: 'map', component: IncidentMapComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
export const routingComponents = [HomeComponent, ArchivedIncidentsComponent];
