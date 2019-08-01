import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IncidentService } from './../incident.service';
import { Incident } from './../incident';
import { Router, ActivatedRoute } from '@angular/router';
import { IncidentsDataSource } from '../incident.data.source';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [IncidentService]
})
export class HomeComponent implements OnInit {
  title = 'NYC Emergency Incident Tracker';
  private hideForm = true;
  private updateForm = false;
  date: number = Date.now();
  dataSource: IncidentsDataSource;
  date2: Date = new Date();

  model = new Incident();

  constructor(private _incidentService: IncidentService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.date = Date.now();
  }

  onClick() {
    this.updateForm = false;
    this.hideForm = !this.hideForm;
    this.model = new Incident();
  }

  onSubmitIncident() {
    this.date2 = new Date();
    this.model.CREATION_DATE = "" + this.date2.toISOString().substr(0,10) + ", " + this.date2.toLocaleTimeString();
    this.model.MODIFICATION_DATE = "" + this.date2.toISOString().substr(0,10) + ", " + this.date2.toLocaleTimeString();
    this._incidentService.addIncidents(this.model).subscribe(
      newIncident => {
        this.ngOnInit();
        this.onClick();
        this.model = new Incident();
        this.dataSource.loadLessons();
        this.dataSource.sortDate();
        this.dataSource.sortDate();
      }
    );
  }

  onUpdateIncident() {
    this._incidentService.updateIncident(this.model).subscribe(
      newIncident => {
        this.ngOnInit();
        this.onClick();
        this.updateForm = false;
        this.model = new Incident();
        this.dataSource.loadLessons();
      }
    );
  }

  closeForm() {
    this.hideForm = true;
  }

  incidentSelect(dataSource: IncidentsDataSource) {
    this.dataSource = dataSource;
  }

  editIncident(incident: Incident) {
    this.updateForm = true;
    this.hideForm = false;
    this.model = Object.assign({}, incident);
  }

  updateSummary(incident: Incident) {
    this.model = Object.assign({}, incident);
    this.onUpdateIncident();
  }
}
