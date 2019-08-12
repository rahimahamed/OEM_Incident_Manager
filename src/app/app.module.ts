import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { IncidentListComponent } from './incident-list/incident-list.component';
import { ArchivedIncidentsComponent } from './archived-incidents/archived-incidents.component';
import { MaterialModule } from '../material-module';
import { IncidentDetailsComponent } from './incident-details/incident-details.component';
import { IncidentMapComponent } from './incident-map/incident-map.component';
import { UserCreateComponent } from './user-components/user-create/user-create.component';
import { UserLoginComponent } from './user-components/user-login/user-login.component';
import { UserProfileComponent } from './user-components/user-profile/user-profile.component';

import { EditorModule } from '@tinymce/tinymce-angular';

import { AgmCoreModule } from '@agm/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    IncidentListComponent,
    ArchivedIncidentsComponent,
    IncidentDetailsComponent,
    IncidentMapComponent,
    UserCreateComponent,
    UserLoginComponent,
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
    ReactiveFormsModule,
    EditorModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAArhePtiJGhta5z2dcWhcI88stTnP3emE',
      language: 'en',
      libraries: ['places']
    }),
    MDBBootstrapModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
