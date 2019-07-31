import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { IncidentListComponent } from './incident-components/incident-list/incident-list.component';
import { ArchivedIncidentsComponent } from './incident-components/archived-incidents/archived-incidents.component';
import { MaterialModule } from '../material-module';
import { IncidentCommentsComponent } from './incident-components/incident-comments/incident-comments.component';
import { IncidentDetailsComponent } from './incident-components/incident-details/incident-details.component';
import { IncidentMapComponent } from './incident-components/incident-map/incident-map.component';
import { UserCreateComponent } from './user-components/user-create/user-create.component';
import { UserLoginComponent } from './user-components/user-login/user-login.component';
import { AlertComponent } from './user-components/alert/alert.component';
import { UserProfileComponent } from './user-components/user-profile/user-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    IncidentListComponent,
    ArchivedIncidentsComponent,
    IncidentCommentsComponent,
    IncidentDetailsComponent,
    IncidentMapComponent,
    UserCreateComponent,
    UserLoginComponent,
    AlertComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
