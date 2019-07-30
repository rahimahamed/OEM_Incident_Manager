import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Incident } from '../incident';
import { pairs } from 'rxjs';
import { keyframes } from '@angular/animations';
import { Key } from 'protractor';
@Component({
  selector: 'app-incident-details',
  templateUrl: './incident-details.component.html',
  styleUrls: ['./incident-details.component.css']
})
export class IncidentDetailsComponent implements OnInit {

  @Input() incident: Incident;
  @Output() closeForm = new EventEmitter();
  @Output() archiveIncident = new EventEmitter();
  @Output() editIncident = new EventEmitter();
  @Output() updateSummary = new EventEmitter();

  summaryExists = false;
  editPressed = false;
  summary: string;
  map: {
    key: string;
    value: string;
  };

  columnsToDisplay = ['title', 'location', 'status'];

  constructor() {
  }

  ngOnInit() {
    if (this.incident.SUMMARY) {
      this.summaryExists = true;
    }
    // this.closeForm.emit();
  }

  generateArray(obj) {
    return Object.keys(obj).map((key) => {
      // if (!(key === 'SUMMARY' || key === '__v' || key === '_id')) {
        return {
          key, value: obj[key]
        };
      // }
      // return true;
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
