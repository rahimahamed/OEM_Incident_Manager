import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Incident } from '../incident';
@Component({
  selector: 'app-incident-details',
  templateUrl: './incident-details.component.html',
  styleUrls: ['./incident-details.component.css']
})
export class IncidentDetailsComponent implements OnInit {
  @Input() incident: Incident;
  incidentCopy: Incident;
  @Output() archiveIncident = new EventEmitter();
  @Output() editIncident = new EventEmitter();
  @Output() updateSummary = new EventEmitter();

  editField: string;

  summaryExists = false;
  summaryEdit = false;
  summary: string;
  columnsToDisplay = ['title', 'location', 'status'];

  constructor() {}

  ngOnInit() {
    if (this.incident.SUMMARY) {
      this.summaryExists = true;
    }
    this.incidentCopy = Object.assign({}, this.incident);
  }

  onArchive() {
    this.archiveIncident.emit(this.incident);
  }

  onEdit() {
    this.summaryEdit = !this.summaryEdit;
  }

  onSubmitSummary() {
    this.incident.SUMMARY = this.summary;
    this.summaryEdit = false;
    this.updateSummary.emit(this.incident);
    if (this.incident.SUMMARY) {
      this.summaryExists = true;
    }
  }

  displayItem(key) {
    if (
      !(
        key === 'SUMMARY' ||
        key === '__v' ||
        key === '_id' ||
        key === 'COMMENTS'
      )
    ) {
      return true;
    } else {
      return false;
    }
  }

  updateList(id: string, value: string, event: any) {
    const editField = event.target.textContent;
    if (editField === '') {
      alert('VALUE CANNOT BE EMPTY');
    } else {
      this.incidentCopy[id] = editField;
      this.editIncident.emit(this.incidentCopy);
    }
  }

  changeValue(id: string, value: string, event: any) {
    this.editField = event.target.textContent;
    if (event.keyCode === 13) {
      event.target.blur();
    }
  }

  sortNull() {}
}
