import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Incident } from '../incident';

@Component({
  selector: 'app-incident-details',
  templateUrl: './incident-details.component.html',
  styleUrls: ['./incident-details.component.css']
})
export class IncidentDetailsComponent implements OnInit {

  @Input() incident: Incident;
  @Output() archiveIncident = new EventEmitter();
  textArea;
  summaryExists = false;
  editPressed = false;

  columnsToDisplay = ['title', 'location', 'status'];

  constructor() { }

  ngOnInit() {
    this.textArea = document.getElementById('summary');
    if (this.incident.SUMMARY) {
      this.summaryExists = true;
    }
  }

  generateArray(obj) {
    return Object.keys(obj).map((key)=>{ return {key:key, value:obj[key]}});
  }

  onArchive() {
    this.archiveIncident.emit(this.incident);
  }

  onEdit() {
    this.editPressed = !this.editPressed;
  }
}
