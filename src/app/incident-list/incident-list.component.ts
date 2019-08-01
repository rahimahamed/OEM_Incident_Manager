import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { Incident } from '../incident';
import { IncidentService } from '../incident.service';
import { IncidentsDataSource } from '../incident.data.source';

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
  @Output() closeF = new EventEmitter();
  @Output() selectIncident = new EventEmitter();
  @Output() editIncident = new EventEmitter();
  @Output() updateSum = new EventEmitter();

  dataSource: IncidentsDataSource;
  incidentList: Incident[] = [
    {
      _id: '5d3919a26ed54400177e1f1f',
      INCIDENT_NAME: 'Power Outage',
      STATUS: 'NOT ACTIVE',
      LOCATION_NAME: 'Brooklyn',
      SUMMARY: null,
      INCIDENT_TYPE:  'CRAZY',
      CREATION_DATE:  null,
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
      CREATION_DATE:  null,
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

  columnsToDisplay = ['title', 'location', 'status'];
  expandedElement: Incident | null;
  mapCenter = [40.730610, -73.935242];
  basemapType = 'streets';
  mapZoomLevel = 12;

  mapLoadedEvent(status: boolean) {
    console.log('The map has loaded: ' + status);
  }

  constructor(private incidentService: IncidentService) { }

  ngOnInit() {
    this.dataSource = new IncidentsDataSource(this.incidentService, true);
    this.dataSource.loadLessons();
    this.onSelect();
  }

  closeForm() {
    this.closeF.emit();
  }

  onSelect() {
    this.selectIncident.emit(this.dataSource);
  }

  onArchive(incident: Incident) {
    incident.STATUS = 'Closed';
    this.incidentService.updateIncident(incident).subscribe(
      archivedIncident => {
        this.ngOnInit();
      }
    );
  }

  onEdit(incident: Incident) {
    this.expandedElement = null;
    this.editIncident.emit(incident);
  }

  updateSummary(incident: Incident) {
    this.updateSum.emit(incident);
  }

}
