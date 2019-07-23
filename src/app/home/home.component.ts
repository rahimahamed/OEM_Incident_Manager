import { Component, OnInit } from '@angular/core';
import { IncidentService } from './../incident.service';
import { Incident } from './../incident';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [IncidentService]
})
export class HomeComponent implements OnInit {
  title = 'NYC Emergency Incident Tracker';
  private hideForm = true;
  date: number = Date.now();

  model = new Incident();

  // allIncidents: Array<Incident> = [];
  incidents: Array<Incident> = [];

  constructor(private _incidentServce: IncidentService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.date = Date.now();
    this.incidents = [];
    this._incidentServce.getIncidents().subscribe((resIncidentData: Incident[]) => {
      for (let entry of resIncidentData) {
        console.log(status);
        if (!(entry.STATUS === 'Closed')) {
          this.incidents.push(entry);
        }
      }
    });
  }

  onClick() {
    this.hideForm = !this.hideForm;
  }

  onSubmitIncident() {
    this._incidentServce.addIncidents(this.model).subscribe(
      newIncident => {
        this.ngOnInit();
        this.hideForm = true;
        this.model = new Incident();
      }
    );
  }

  incidentSelect(incident: Incident) {
    return;
  }

  archiveIncident(incident: Incident) {
    incident.STATUS = 'Closed';
    this._incidentServce.updateIncident(incident).subscribe(
      archivedIncident => {
        this.ngOnInit();
      }
    );
  }
}
