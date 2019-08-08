import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Incident } from '../incident';
import { IncidentService } from '../incident.service';
import { IncidentsDataSource } from '../incident.data.source';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-incident-list',
  templateUrl: './incident-list.component.html',
  styleUrls: ['./incident-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class IncidentListComponent implements OnInit {
  @Output() editIncident = new EventEmitter();
  @Output() sendDataSource = new EventEmitter();

  isLoading = true;
  // dataSource: IncidentsDataSource;
  dataSource: any;
  incidentList: Incident[] = [
    {
      _id: '5d3919a26ed54400177e1f1f',
      INCIDENT_NAME: 'Power Outage',
      STATUS: 'NOT ACTIVE',
      LOCATION_NAME: 'Brooklyn',
      SUMMARY: null,
      INCIDENT_TYPE:  'CRAZY',
      CREATION_DATE:  '2019-07-31, 3:52:57 PM',
      ADDRESS:  null,
      LATITUDE:  null,
      LONGITUDE:  null,
      LEAD_AGENCY:  null,
      SUPPORTING_AGENCY:  null,
      CREATED_BY:  null,
      MODIFICATION_DATE:  null,
      MODIFIED_BY:  null,
      COMMENTS:  null,
    },
    {
      _id: '5d3919a26ed54400177e1f1f',
      INCIDENT_NAME: 'Power Outage',
      STATUS: 'Responding',
      LOCATION_NAME: 'Queens',
      SUMMARY: 'Failure',
      INCIDENT_TYPE:  'LITT',
      CREATION_DATE:  '2019-07-31, 4:00:34 PM',
      ADDRESS:  null,
      LATITUDE:  null,
      LONGITUDE:  null,
      LEAD_AGENCY:  null,
      SUPPORTING_AGENCY:  null,
      CREATED_BY:  null,
      MODIFICATION_DATE:  null,
      MODIFIED_BY:  null,
      COMMENTS:  null,
    },
    {
      _id: '5d3919a26ed54400177e1f1f',
      INCIDENT_NAME: 'Power Outage',
      STATUS: 'Responding',
      LOCATION_NAME: 'Queens',
      SUMMARY: 'Failure',
      INCIDENT_TYPE:  'LITT',
      CREATION_DATE:  '2019-07-25, 4:00:34 PM',
      ADDRESS:  null,
      LATITUDE:  null,
      LONGITUDE:  null,
      LEAD_AGENCY:  null,
      SUPPORTING_AGENCY:  null,
      CREATED_BY:  null,
      MODIFICATION_DATE:  null,
      MODIFIED_BY:  null,
      COMMENTS:  null,
    },
    {
      _id: '5d3919a26ed54400177e1f1f',
      INCIDENT_NAME: 'Power Outage',
      STATUS: 'Responding',
      LOCATION_NAME: 'Queens',
      SUMMARY: 'Failure',
      INCIDENT_TYPE:  'LITT',
      CREATION_DATE:  '2019-02-31, 4:00:34 PM',
      ADDRESS:  null,
      LATITUDE:  null,
      LONGITUDE:  null,
      LEAD_AGENCY:  null,
      SUPPORTING_AGENCY:  null,
      CREATED_BY:  null,
      MODIFICATION_DATE:  null,
      MODIFIED_BY:  null,
      COMMENTS:  null,
    },
    {
      _id: '5d3919a26ed54400177e1f1f',
      INCIDENT_NAME: 'Power Outage',
      STATUS: 'Responding',
      LOCATION_NAME: 'Queens',
      SUMMARY: 'Failure',
      INCIDENT_TYPE:  'LITT',
      CREATION_DATE:  '2019-04-11, 4:00:34 PM',
      ADDRESS:  null,
      LATITUDE:  null,
      LONGITUDE:  null,
      LEAD_AGENCY:  null,
      SUPPORTING_AGENCY:  null,
      CREATED_BY:  null,
      MODIFICATION_DATE:  null,
      MODIFIED_BY:  null,
      COMMENTS:  null,
    },
  ];

  columnsToDisplay = ['title', 'location', 'status', 'date_created', 'date_modified'];
  expandedElement: Incident | null;

  constructor(private incidentService: IncidentService) { }

  ngOnInit() {
    of(this.incidentList).pipe(delay(1000))
     .subscribe(data => {
       this.isLoading = false;
       this.dataSource = data
     }, error => this.isLoading = false);
    this.dataSource = new IncidentsDataSource(this.incidentService, true);
    this.dataSource.loadLessons();
  }

  onArchive(incident: Incident) {
    incident.STATUS = 'Closed';
    this.incidentService.updateIncident(incident).subscribe(
      archivedIncident => {
        this.ngOnInit();
      }
    );
  }

  emitDataSource(){
    this.sendDataSource.emit(this.dataSource);
  }

  onEdit(incident: Incident) {
    this.expandedElement = null;
    this.editIncident.emit(incident);
  }

// SORTING HELPER METHODS

  sortName(){
    this.dataSource.sortName();
  }

  sortLocation(){
    this.dataSource.sortLocation();
  }

  sortStatus(){
    this.dataSource.sortStatus();
  }

  sortDate(){
    this.dataSource.sortDate();
  }

  sortDateModified(){
    this.dataSource.sortDateModified();
  }



  updateSummary(incident: Incident) {
    this.incidentService.updateIncident(incident).subscribe(
      newIncident => {
        this.dataSource.loadLessons();
      }
    );
  }

// HELPER METHOD FOR FILTER METHOD IN incident.data.source.ts

  applyFilter(filterValue: string) {
    this.dataSource.filter(filterValue.trim().toLowerCase());
  }

  updateLocation(incident: Incident) {
    this.incidentService.updateIncident(incident).subscribe(
      newIncident => {
        this.dataSource.loadLessons();
      }
    );
  }
}
