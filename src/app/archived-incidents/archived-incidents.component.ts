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

  @Output() selectIncident = new EventEmitter();
  @Output() archiveIncident = new EventEmitter();

  isLoading = true;
  dataSource: IncidentsDataSource;
  columnsToDisplay = ['title', 'location', 'status', 'date_created', 'date_modified'];
  expandedElement: Incident | null;

  constructor(private incidentService: IncidentService) { }

  ngOnInit() {
    this.isLoading = true;
    this.dataSource = new IncidentsDataSource(this.incidentService, false);
    this.dataSource.loadLessons();
    this.isLoading = false;
  }

  onSelect(incident) {
    this.selectIncident.emit(incident);
  }

  onArchive(incident) {
    this.archiveIncident.emit(incident);
  }

  onOpen(incident) {
    return;
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

// HELPER METHOD FOR FILTER METHOD IN incident.data.source.ts

  applyFilter(filterValue: string) {
    this.dataSource.filter(filterValue.trim().toLowerCase());
  }

}
