import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { Incident } from '../incident';
import { IncidentService } from '../incident.service';
import { IncidentsDataSource } from '../incident.data.source';
@Component({
  selector: 'app-archived-incidents',
  templateUrl: './archived-incidents.component.html',
  styleUrls: ['./archived-incidents.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ArchivedIncidentsComponent implements OnInit {

  @Output() unArchiveIncident = new EventEmitter();

  dataSource: IncidentsDataSource;
  columnsToDisplay = ['title', 'location', 'status', 'date_created', 'date_modified'];
  expandedElement: Incident | null;

  constructor(private incidentService: IncidentService) { }

  ngOnInit() {
    this.dataSource = new IncidentsDataSource(this.incidentService, false);
    this.dataSource.loadLessons();
  }

  unArchive(incident: Incident) {
    //COMPLETE LATER: UNARCHIVE AN INCIDENT
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
