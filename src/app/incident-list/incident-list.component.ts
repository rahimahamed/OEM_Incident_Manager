import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
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

  columnsToDisplay = ['title', 'location', 'status', 'date_created', 'date_modified'];
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

  sortDate(){
    this.dataSource.sortDate();
  }

  sortDateModified(){
    this.dataSource.sortDateModified();
  }

  updateSummary(incident: Incident) {
    this.updateSum.emit(incident);
  }

  applyFilter(filterValue: string) {
    this.dataSource = new IncidentsDataSource(this.incidentService, true);
    this.dataSource.filter(filterValue.trim().toLowerCase());
  }

}
