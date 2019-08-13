import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Incident } from '../incident';
import { LogisticsDataSource } from '../logistics-data/logistics.data.source';
import { Supply } from '../supplies';
@Component({
  selector: 'app-incident-details',
  templateUrl: './incident-details.component.html',
  styleUrls: ['./incident-details.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class IncidentDetailsComponent implements OnInit {
  @Input() incident: Incident;
  @Input() archive: boolean;
  @Output() archiveIncident = new EventEmitter();
  @Output() editIncident = new EventEmitter();
  @Output() updateSummary = new EventEmitter();

  expandedElement: any | null;

  summaryExists = false;
  summaryEdit = false;
  summary: string;
  columnsToDisplay = ['title', 'location', 'status'];

  constructor() {}

  ngOnInit() {
    if (this.incident.SUMMARY) {
      this.summaryExists = true;
      this.summary = this.incident.SUMMARY;
    }
  }

  onArchive() {
    this.archiveIncident.emit(this.incident);
  }

  emitEdit(incident: Incident) {
    this.incident.SUPPLIES = incident.SUPPLIES;
    console.log(incident.SUPPLIES);
    this.editIncident.emit(this.incident);
  }

  onEdit() {
    this.summaryEdit = !this.summaryEdit;
    window.setTimeout( () => {
      document.getElementById('textBox').focus();
    }, 0);
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
        || key === 'COMMENTS' || key === 'SUPPLIES')) {
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
    if (editField === value || editField === '' || editField === ' ') {

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
