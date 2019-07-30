import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';

import { AppRoutingModule, routingComponents} from './app-routing.module';
import { AppComponent } from './app.component';
import { IncidentListComponent } from './incident-list/incident-list.component';
import { ArchivedIncidentsComponent } from './archived-incidents/archived-incidents.component';
import { MaterialModule } from '../material-module';
import { IncidentCommentsComponent } from './incident-comments/incident-comments.component';
import { IncidentDetailsComponent } from './incident-details/incident-details.component';
import { IncidentMapComponent } from './incident-map/incident-map.component';


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    IncidentListComponent,
    ArchivedIncidentsComponent,
    IncidentCommentsComponent,
    IncidentDetailsComponent,
    IncidentMapComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatNativeDateModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatInputModule,
    DropDownsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
