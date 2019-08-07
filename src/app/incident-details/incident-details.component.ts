import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Incident } from '../incident';
@Component({
  selector: 'app-incident-details',
  templateUrl: './incident-details.component.html',
  styleUrls: ['./incident-details.component.css']
})
export class IncidentDetailsComponent implements OnInit {

  @Input() incident: Incident;
  @Input() archive: boolean;
  @Output() archiveIncident = new EventEmitter();
  @Output() editIncident = new EventEmitter();
  @Output() updateSummary = new EventEmitter();

  summaryExists = false;
  summaryEdit = false;
  summary: string;
  columnsToDisplay = ['title', 'location', 'status'];

  constructor() {
  }

  ngOnInit() {
    if (this.incident.SUMMARY) {
      this.summaryExists = true;
      this.summary = this.incident.SUMMARY;
    }
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

  displayItem(key: string) {
    if (!(key === 'SUMMARY' || key === '__v' || key === '_id'
        || key === 'COMMENTS')) {
      return true;
    } else {
      return false;
    }
  }

  isEditable(key: string) {
    if (key === 'ADDRESS' || key === 'LATITUDE' || key === 'LONGITUDE' || key === 'CREATION_DATE'
    || key === 'CREATED_BY' || key === 'MODIFICATION_DATE' || key === 'MODIFIED_BY') {
      return false;
    } else {
      return true;
    }
  }

  cleanKey(key: string) {
    return key.replace('_', ' ');
  }

  updateList(id: string, value: string, event: any) {
    const editField = event.target.textContent;
    if (editField === '' || editField === ' ') {
      alert('VALUE CANNOT BE EMPTY');
    } else {
      this.incident[id] = editField;
      this.editIncident.emit(this.incident);
    }
  }

  changeValue(id: string, value: string, event: any) {
    if (event.keyCode === 13) {
      event.target.blur();
    }
  }

  sortNull() {}
}
