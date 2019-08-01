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
  @Output() editIncident = new EventEmitter();
  @Output() updateSummary = new EventEmitter();

  summaryExists = false;
  summary: string;
  columnsToDisplay = ['title', 'location', 'status'];

  constructor() {
  }

  ngOnInit() {
    if (this.incident.SUMMARY) {
      this.summaryExists = true;
    }
  }

  generateArray(obj) {
    return Object.keys(obj).map((key) => {
      return {
        key, value: obj[key]
      };
    });
  }

  onArchive() {
    this.archiveIncident.emit(this.incident);
  }

  onEdit() {
    this.editIncident.emit(this.incident);
  }

  onSubmitSummary() {
    this.incident.SUMMARY = this.summary;
    this.updateSummary.emit(this.incident);
    if (this.incident.SUMMARY) {
      this.summaryExists = true;
    }
  }

  displayItem(key) {
    if (!(key === 'SUMMARY' || key === '__v' || key === '_id')) {
      return true;
    } else {
      return false;
    }
  }

}
