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
  @Output() selectIncident = new EventEmitter();
  @Output() archiveIncident = new EventEmitter();

  dataSource: IncidentsDataSource;
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

  onArchive(incident) {
    this.archiveIncident.emit(incident);
  }

  onOpen(incident) {
    return;
  }

  sortAlphabetically(numba){
    this.dataSource.sortAlphabetically(numba);
  }

}
