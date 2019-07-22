import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Incident } from '../incident';

@Component({
  selector: 'app-incident-list',
  templateUrl: './incident-list.component.html',
  styleUrls: ['./incident-list.component.css'],
})
export class IncidentListComponent implements OnInit {
  @Input() incidents: Incident[];
  @Output() selectIncident = new EventEmitter();
  @Output() deleteIncident = new EventEmitter();

  public _id = 45612445552114;

  constructor() { }

  ngOnInit() {
  }

  onSelect(incident) {
    this.selectIncident.emit(incident);
  }

  onDelete(incident) {
    this.deleteIncident.emit(incident);
  }

}
