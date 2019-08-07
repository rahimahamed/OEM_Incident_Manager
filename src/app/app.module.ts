import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { IncidentListComponent } from './incident-components/incident-list/incident-list.component';
import { IncidentDetailsComponent } from './incident-components/incident-details/incident-details.component';
import { ArchivedIncidentsComponent } from './incident-components/archived-incidents/archived-incidents.component';
import { MaterialModule } from '../material-module';
import { IncidentCommentsComponent } from './comment-components/incident-comments/incident-comments.component';
import { IncidentMapComponent } from './incident-components/incident-map/incident-map.component';
import { EditorModule } from '@tinymce/tinymce-angular';

import { AgmCoreModule } from '@agm/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { UserCreateComponent } from './user-components/user-create/user-create.component';
import { UserLoginComponent } from './user-components/user-login/user-login.component';
import { AlertComponent } from './user-components/alert/alert.component';
import { IncidentCommentsListComponent } from './comment-components/incident-comments-list/incident-comments-list.component';
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
    UserProfileComponent,
    IncidentCommentsListComponent
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
