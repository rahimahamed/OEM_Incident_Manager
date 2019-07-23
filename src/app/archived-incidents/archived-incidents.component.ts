import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Incident } from '../incident';
import { IncidentService } from '../incident.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-archived-incidents',
  templateUrl: './archived-incidents.component.html',
  styleUrls: ['./archived-incidents.component.css']
})
export class ArchivedIncidentsComponent implements OnInit {

  incidents: Incident[];
  @Output() selectIncident = new EventEmitter();
  @Output() archiveIncident = new EventEmitter();

  constructor(private _incidentServce: IncidentService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.incidents = [];
    this._incidentServce.getIncidents().subscribe((resIncidentData: Incident[]) => {
      for (let entry of resIncidentData) {
        if (entry.STATUS === 'Closed') {
          this.incidents.push(entry);
        }
      }
    });
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
