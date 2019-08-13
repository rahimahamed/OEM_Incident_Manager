import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { Incident } from '../incident';
import { IncidentService } from '../incident.service';
import { IncidentsDataSource } from '../incident.data.source';

@Component({
  selector: 'app-incident-list',
  templateUrl: './incident-list.component.html',
  styleUrls: ['./incident-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      )
    ])
  ]
})
export class IncidentListComponent implements OnInit {
  @Input() dataSource: IncidentsDataSource;
  incidentList: Incident[] = [
    {
      _id: '5d3919a26ed54400177e1f1f',
      INCIDENT_NAME: 'Power Outage',
      STATUS: 'Closed',
      LOCATION_NAME: 'Brooklyn',
      SUMMARY: null,
      INCIDENT_TYPE: 'CRAZY',
      CREATION_DATE: '2019-07-31, 3:52:57 PM',
      ADDRESS: null,
      LATITUDE: null,
      LONGITUDE: null,
      LEAD_AGENCY: null,
      SUPPORTING_AGENCY: null,
      CREATED_BY: null,
      MODIFICATION_DATE: null,
      MODIFIED_BY: null,
      COMMENTS: null
    },
    {
      _id: '5d3919a26ed54400177e1f1f',
      INCIDENT_NAME: 'Power Outage',
      STATUS: 'Responding',
      LOCATION_NAME: 'Queens',
      SUMMARY: 'Failure',
      INCIDENT_TYPE: 'LITT',
      CREATION_DATE: '2019-07-31, 4:00:34 PM',
      ADDRESS: null,
      LATITUDE: null,
      LONGITUDE: null,
      LEAD_AGENCY: null,
      SUPPORTING_AGENCY: null,
      CREATED_BY: null,
      MODIFICATION_DATE: null,
      MODIFIED_BY: null,
      COMMENTS: null
    },
    {
      _id: '5d3919a26ed54400177e1f1f',
      INCIDENT_NAME: 'Power Outage',
      STATUS: 'Responding',
      LOCATION_NAME: 'Queens',
      SUMMARY: 'Failure',
      INCIDENT_TYPE: 'LITT',
      CREATION_DATE: '2019-07-25, 4:00:34 PM',
      ADDRESS: null,
      LATITUDE: null,
      LONGITUDE: null,
      LEAD_AGENCY: null,
      SUPPORTING_AGENCY: null,
      CREATED_BY: null,
      MODIFICATION_DATE: null,
      MODIFIED_BY: null,
      COMMENTS: null
    },
    {
      _id: '5d3919a26ed54400177e1f1f',
      INCIDENT_NAME: 'Power Outage',
      STATUS: 'Open,Response',
      LOCATION_NAME: 'Queens',
      SUMMARY: 'Failure',
      INCIDENT_TYPE: 'LITT',
      CREATION_DATE: '2019-02-31, 4:00:34 PM',
      ADDRESS: null,
      LATITUDE: null,
      LONGITUDE: null,
      LEAD_AGENCY: null,
      SUPPORTING_AGENCY: null,
      CREATED_BY: null,
      MODIFICATION_DATE: null,
      MODIFIED_BY: null,
      COMMENTS: null
    },
    {
      _id: '5d3919a26ed54400177e1f1f',
      INCIDENT_NAME: 'Power Outage',
      STATUS: 'Open,Monitoring',
      LOCATION_NAME: 'Queens',
      SUMMARY: 'Failure',
      INCIDENT_TYPE: 'LITT',
      CREATION_DATE: '2019-04-11, 4:00:34 PM',
      ADDRESS: null,
      LATITUDE: null,
      LONGITUDE: null,
      LEAD_AGENCY: null,
      SUPPORTING_AGENCY: null,
      CREATED_BY: null,
      MODIFICATION_DATE: null,
      MODIFIED_BY: null,
      COMMENTS: null
    }
  ];

  columnsToDisplay = [
    'title',
    'location',
    'status',
    'date_created',
    'date_modified'
  ];
  expandedElement: Incident | null;

  constructor(
    private incidentService: IncidentService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.dataSource.loadLessons();
  }

  onArchive(incident: Incident) {
    incident.STATUS = 'Closed';
    this.incidentService
      .updateIncident(incident)
      .subscribe(archivedIncident => {
        this.dataSource.loadLessons();
      });
  }

  updateIncident(incident: Incident) {
    this.dataSource.updateLessons(incident);
    this.changeDetectorRef.detectChanges();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter(filterValue.trim().toLowerCase());
  }

  sortName() {
    this.dataSource.sortName();
  }

  sortLocation() {
    this.dataSource.sortLocation();
  }

  sortStatus() {
    this.dataSource.sortStatus();
  }

  sortDate() {
    this.dataSource.sortDate();
  }

  sortDateModified() {
    this.dataSource.sortDateModified();
  }
}
