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

  archive(incident: Incident) {
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
