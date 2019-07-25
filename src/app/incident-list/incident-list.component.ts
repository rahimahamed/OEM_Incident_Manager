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
  @Output() selectIncident = new EventEmitter();

  dataSource: IncidentsDataSource;
  incidentList: Incident[] = [
    {
      _id: '5d3919a26ed54400177e1f1f',
      INCIDENT_NAME: 'Power Outage',
      STATUS: 'Responding',
      LOCATION_NAME: 'Brooklyn',
      SUMMARY:  ' ',
      INCIDENT_TYPE:  '',
      CREATION_DATE:  ' ',
      ADDRESS:  ' ',
      LATITUDE:  ' ',
      LONGITUDE:  ' ',
      LEAD_AGENCY:  ' ',
      SUPPORTING_AGENCY:  ' ',
      CREATED_BY:  ' ',
      MODIFICATION_DATE:  ' ',
      MODIFIED_BY:  ' ',
      COMMENTS:  ' ',
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

}
