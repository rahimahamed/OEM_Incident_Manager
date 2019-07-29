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
    this._incidentService.addIncidents(this.model).subscribe(
      newIncident => {
        this.ngOnInit();
        this.onClick();
        this.model = new Incident();
        this.dataSource.loadLessons();
      }
    );
  }

  onUpdateIncident() {
    this._incidentService.updateIncident(this.model).subscribe(
      newIncident => {
        this.ngOnInit();
        this.onClick();
        this.updateForm = false;
        this.dataSource.loadLessons();
      }
    );
  }

  incidentSelect(dataSource: IncidentsDataSource) {
    this.dataSource = dataSource;
  }

  editIncident(id: Incident) {
    this.updateForm = true;
    this.hideForm = false;
    this.model = Object.assign({}, id);
    // this._incidentService.getID(id).subscribe(
    //   incident => {
    //     this.model = Object.assign({}, incident as Incident);
    //     this.onClick();
    //     this.updateForm = true;
    //   }
    // );
  }
}
