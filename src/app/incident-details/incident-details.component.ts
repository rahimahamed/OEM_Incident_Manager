import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { Incident } from '../incident';
@Component({
  selector: 'app-incident-details',
  templateUrl: './incident-details.component.html',
  styleUrls: ['./incident-details.component.css'],
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
export class IncidentDetailsComponent implements OnInit {
  @Input() incident: Incident;
  @Input() archive: boolean; // SINCE BOTH ACTIVE & ARCHIVE USE THIS COMPONENT, THIS TELLS YOU WHICH ONE IS USING IT
  @Output() archiveIncident = new EventEmitter();
  @Output() editIncident = new EventEmitter();
  @Output() updateSummary = new EventEmitter();

  expandedElement: any | null;

  summaryExists = false;
  summaryEdit = false;
  summary: string;

  constructor() {}

  ngOnInit() {
    // LOADS SUMMARY IF IT EXISTS
    if (this.incident.SUMMARY) {
      this.summaryExists = true;
      this.summary = this.incident.SUMMARY;
    }
  }

  // WHEN AN INCIDENT IS ARCHIVED
  clickArchive() {
    this.archiveIncident.emit(this.incident);
  }

  // THIS IS ONLY USED WHEN LOGISTICS PIECE MAKES A CHANGE
  emitEdit(incident: Incident) {
    this.incident.SUPPLIES = incident.SUPPLIES;
    console.log(incident.SUPPLIES);
    this.editIncident.emit(this.incident);
  }

  // WHEN EDIT BUTTON IS PRESSED
  editSummary() {
    this.summaryEdit = !this.summaryEdit;
    window.setTimeout(() => {
      document.getElementById('textBox').focus();
    }, 0);
  }

  // WHEN SUBMIT BUTTON IS PRESSED
  submitSummary() {
    this.incident.SUMMARY = this.summary;
    this.summaryEdit = false;
    this.updateSummary.emit(this.incident);
    if (this.incident.SUMMARY) {
      this.summaryExists = true;
    }
  }

  // IF RETURED TRUE IT DOES NOT LIST THESE ITEMS IN THE TABLE
  displayItem(key: string) {
    if (
      !(
        key === 'SUMMARY' ||
        key === '__v' ||
        key === '_id' ||
        key === 'COMMENTS' ||
        key === 'SUPPLIES'
      )
    ) {
      return true;
    } else {
      return false;
    }
  }

  // MANDATES WHICH FIELDS CAN BE EDITED
  isEditable(key: string) {
    if (
      key === 'ADDRESS' ||
      key === 'LATITUDE' ||
      key === 'LONGITUDE' ||
      key === 'CREATION_DATE' ||
      key === 'CREATED_BY' ||
      key === 'MODIFICATION_DATE' ||
      key === 'MODIFIED_BY'
    ) {
      return false;
    } else {
      return true;
    }
  }

  // DOESNT SHOW SPECIAL CHARACTERS WHEN SHOWING LIST
  cleanKey(key: string) {
    return key.replace('_', ' ');
  }

  // WHEN USER CLICKS AWAY FROM EDITING TABLE
  updateList(id: string, value: string, event: any) {
    const editField = event.target.textContent;
    if (editField === value || editField === '' || editField === ' ') {
    } else {
      this.incident[id] = editField;
      this.editIncident.emit(this.incident);
    }
  }

  // TRIGGERED WHEN SOMETHING IS TYPE
  changeValue(id: string, value: string, event: any) {
    if (event.keyCode === 13) {
      event.target.blur();
    }
  }

  // FILLER METHOD TO DISPLAY LIST IN HTML
  sortNull() {}
}
