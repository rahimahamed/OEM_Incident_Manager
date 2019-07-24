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
  @Input() incidents: Incident[];
  @Output() selectIncident = new EventEmitter();
  @Output() archiveIncident = new EventEmitter();

  // ELEMENT_DATA: Incident[] = [
  //   {
  //       _id: '5d2f3f3aeae75939345b9dbb',
  //       title: 'Power Outage',
  //       location: 'Brooklyn',
  //       status: 'Closed',
  //   },
  //   {
  //       _id: '5d30ceaf38ed6945a8100564',
  //       title: 'Test',
  //       location: 'Test',
  //       status: 'Closed',
  //   },
  // ];

  dataSource: IncidentsDataSource;
  columnsToDisplay = ['title', 'location', 'status'];
  expandedElement: Incident | null;

  constructor(private incidentService: IncidentService) { }

  ngOnInit() {
    this.dataSource = new IncidentsDataSource(this.incidentService);
    this.dataSource.loadLessons();
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
}
