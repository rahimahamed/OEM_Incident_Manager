import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatNativeDateModule} from '@angular/material/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule, routingComponents} from './app-routing.module';
import { AppComponent } from './app.component';
import { IncidentListComponent } from './incident-list/incident-list.component';
import { IncidentDetailsComponent } from './incident-details/incident-details.component';
import { ArchivedIncidentsComponent } from './archived-incidents/archived-incidents.component';
import { MaterialModule } from '../material-module';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    IncidentListComponent,
    IncidentDetailsComponent,
    ArchivedIncidentsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
