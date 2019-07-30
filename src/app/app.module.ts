import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { IncidentListComponent } from './incident-list/incident-list.component';
import { ArchivedIncidentsComponent } from './archived-incidents/archived-incidents.component';
import { MaterialModule } from '../material-module';
import { IncidentCommentsComponent } from './incident-comments/incident-comments.component';
import { IncidentDetailsComponent } from './incident-details/incident-details.component';
import { IncidentMapComponent } from './incident-map/incident-map.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { AlertComponent } from './alert/alert.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

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
