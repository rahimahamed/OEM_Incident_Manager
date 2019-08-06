import { Component, OnInit, ViewChild, ElementRef, } from '@angular/core';
import { IncidentService } from './../incident.service';
import { Incident } from './../incident';
import { Router, ActivatedRoute } from '@angular/router';
import { IncidentsDataSource } from '../incident.data.source';
import { FormGroup, FormControl } from '@angular/forms';

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
  dataSource: IncidentsDataSource;
  date2: Date = new Date();

  model = new Incident();

  submitForm = new FormGroup({
    incidentName: new FormControl(this.model.INCIDENT_NAME),
    location: new FormControl(this.model.LOCATION_NAME),
    status: new FormControl(this.model.STATUS),
    prognosis: new FormControl(),
  });

  statusList: any = [
    {
      statusName: 'Report Closed',
      prognosisList: [
        'Monitoring', 'Response',
      ]
    },
    {
      statusName: 'Open',
      prognosisList: [
        'Monitoring', 'Response', 'Extended Operation',
      ]
    },
    {
      statusName: 'Special Attention',
      prognosisList: [
        'Monitoring',
      ]
    }
  ];

  prognosisList: any = [];

  constructor(private incidentService: IncidentService,
              private router: Router,
              private route: ActivatedRoute,
              ) { }

  ngOnInit() {
    this.date = Date.now();
    this.dataSource = new IncidentsDataSource(this.incidentService, true);
  }

  statusChangeAction() {
    const dropDownData = this.statusList.find((data: any) =>
            data.statusName === this.submitForm.controls.status.value);
    if (dropDownData) {
      this.prognosisList = dropDownData.prognosisList;
    } else {
      this.prognosisList = [];
    }
  }

  onClick() {
    console.log('Submit Emergency');
    this.hideForm = !this.hideForm;
    this.model = new Incident();
  }

  onSubmitIncident() {
    this.date2 = new Date();
    this.model.CREATION_DATE = '' + this.date2.toISOString().substr(0,10) + ', ' + this.date2.toLocaleTimeString();
    this.model.MODIFICATION_DATE = '' + this.date2.toISOString().substr(0,10) + ', ' + this.date2.toLocaleTimeString();

    this.model.INCIDENT_NAME = this.submitForm.controls.incidentName.value;
    this.model.LOCATION_NAME = this.submitForm.controls.location.value;
    this.model.STATUS = this.submitForm.controls.status.value +
    ',' + this.submitForm.controls.prognosis.value;

    this.incidentService.addIncidents(this.model).subscribe(
      newIncident => {
        this.onClick();
        this.model = new Incident();
        this.dataSource.loadLessons();
      }
    );
  }

  onUpdateIncident() {
    this.date2 = new Date();
    this.model.MODIFICATION_DATE = '' + this.date2.toISOString().substr(0,10) + ', ' + this.date2.toLocaleTimeString();
    this.incidentService.updateIncident(this.model).subscribe(
      newIncident => {
        this.onClick();
        this.model = new Incident();
        // this.dataSource.loadLessons();
      }
    );
  }

  editIncident(incident: Incident) {
    this.hideForm = false;
    this.model = Object.assign({}, incident);
    this.onUpdateIncident();
  }

  setLocation(incident: Incident) {
    console.log('Setting Location in the Home Component');
    this.model.ADDRESS = incident.ADDRESS;
    this.model.LATITUDE = incident.LATITUDE;
    this.model.LONGITUDE = incident.LONGITUDE;
  }
}
