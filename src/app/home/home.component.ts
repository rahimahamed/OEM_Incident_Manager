
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
  private updateForm = false;
  date: number = Date.now();
  dataSource: IncidentsDataSource;

  @ViewChild('search', {static: false}) public searchElementRef: ElementRef;

  model = new Incident();

  submitForm = new FormGroup({
    incidentName: new FormControl(this.model.INCIDENT_NAME),
    location: new FormControl(this.model.LOCATION_NAME),
    status: new FormControl(this.model.STATUS),
    prognosis: new FormControl(),
    address: new FormControl(this.model.ADDRESS),
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
    this.updateForm = false;
    this.hideForm = !this.hideForm;
    this.model = new Incident();
  }

  onSubmitIncident() {
    console.log('Hello this is a test');
    console.log(this.model.INCIDENT_NAME);
    this.model.INCIDENT_NAME = this.submitForm.controls.incidentName.value;
    console.log(this.model.INCIDENT_NAME);
    this.model.LOCATION_NAME = this.submitForm.controls.location.value;
    console.log(this.submitForm.controls.prognosis.value);
    this.model.STATUS = this.submitForm.controls.status.value + ',' + this.submitForm.controls.prognosis.value;
    this.model.ADDRESS = this.submitForm.controls.address.value;
    this.incidentService.addIncidents(this.model).subscribe(
      newIncident => {
        this.ngOnInit();
        this.onClick();
        this.model = new Incident();
        this.dataSource.loadLessons();
      }
    );
  }

  onUpdateIncident() {
    this.incidentService.updateIncident(this.model).subscribe(
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
