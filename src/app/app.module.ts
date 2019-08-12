import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { IncidentListComponent } from './incident-list/incident-list.component';
import { ArchivedIncidentsComponent } from './archived-incidents/archived-incidents.component';
import { MaterialModule } from '../material-module';
import { IncidentCommentsComponent } from './incident-components/comments/incident-comments/incident-comments.component';
import { IncidentDetailsComponent } from './incident-details/incident-details.component';
import { IncidentMapComponent } from './incident-map/incident-map.component';
import { UserCreateComponent } from './user-components/user-create/user-create.component';
import { UserLoginComponent } from './user-components/user-login/user-login.component';
import { AlertComponent } from './user-components/alert/alert.component';
import { UserProfileComponent } from './user-components/user-profile/user-profile.component';
import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { EditorModule } from '@tinymce/tinymce-angular';
import { IncidentCommentsListComponent } from './incident-components/comments/incident-comments-list/incident-comments-list.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

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
    MatNativeDateModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatInputModule,
    EditorModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAArhePtiJGhta5z2dcWhcI88stTnP3emE',
      language: 'en',
      libraries: ['places']
    }),
    AgmSnazzyInfoWindowModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
