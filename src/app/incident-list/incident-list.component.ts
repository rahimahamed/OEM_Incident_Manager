import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
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
      SUMMARY: 'Mon Jul 29 11:47:15 2019 STATUS: Active PROGNOSIS: Response Structural-Partial Collapse Bronx 2708 Schurz Avenue (NYCEM NYC.Gov List) An interagency meeting was held with the following agencies in attendance: DOB and NYCEM. DOB reports that no work has been conducted. The building owner has not hired a demo contractor to demolish the structure. DOB reports HPD will start demolition of the structure tomorrow morning. An interagency meeting has been scheduled for tomorrow July 30th at 1200 hrs. NYCEM operations continue. RESPONDING UNITS: NYCEM 610 REVIEWED AND APPROVED BY: NYCEM 532 RB INCIDENT NO: Inc-145421-103-072119 ',
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

  sortName(){
    this.dataSource.sortName();
  }

  sortLocation(){
    this.dataSource.sortLocation();
  }

  sortStatus(){
    this.dataSource.sortStatus();
  }

  updateSummary(incident: Incident) {
    this.updateSum.emit(incident);
  }

  applyFilter(filterValue: string) {
    this.dataSource = new IncidentsDataSource(this.incidentService, true);
    this.dataSource.filter(filterValue.trim().toLowerCase());
  }

}
