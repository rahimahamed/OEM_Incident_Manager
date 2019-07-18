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
  str = 'Emergency: ';
  date: number = Date.now();
  public displayStyle = {
    visibility: 'hidden',
    color : 'blue'
  };

  model = new Incident();

  incidents: Array<Incident> = [];

  constructor(private _incidentServce: IncidentService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.date = Date.now();
    this._incidentServce.getIncidents().subscribe((resIncidentData: Incident[]) => {
      this.incidents = resIncidentData;
    });
  }

  onClick() {
    this.hideForm = !this.hideForm;
  }

  onSubmitIncident() {
    // this.displayStyle.visibility = 'visible';
    // this.str += this.model.title + ' at ' + this.model.location;
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

  deleteIncident(incident: Incident) {
    this._incidentServce.deleteIncident(incident).subscribe(
      deletedIncident => {
        this.ngOnInit();
      }
    );
  }
}
