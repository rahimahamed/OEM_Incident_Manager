import { Component, OnInit } from '@angular/core';
import { IncidentService } from './../incident.service';
import { Incident } from './../incident';
import { Router, ActivatedRoute } from '@angular/router';
import { IncidentsDataSource } from '../incident.data.source';
import { FormGroup, FormControl } from '@angular/forms';
import { IfStmt } from '@angular/compiler';

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

  check1= "false";
  check2 = "false";
  check3 = "false";



  //selectedValue: string = "";
  statuses = [
    {value: 'Open', viewValue: 'Open'},
    {value: 'Report Closed', viewValue: 'Report Closed'},
    {value: 'Special Attention', viewValue: 'Special Attention'}
  ];

  prognoses1 = [
    {value: 'Monitoring', viewValue: 'Monitoring'},
    {value: 'Response', viewValue: 'Response'},
    {value: 'Extended Operation', viewValue: 'Extended Operation'}
  ]

  prognoses2 = [
    {value: 'Monitoring', viewValue: 'Monitoring'},
    {value: 'Response', viewValue: 'Response'},
  ]

  prognoses3 = [
    {value: 'Monitoring', viewValue: 'Monitoring'},
  ]



  model = new Incident();

  constructor(private _incidentService: IncidentService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.date = Date.now();
  }

  onClick() {
    this.hideForm = !this.hideForm;
  }

  onSubmitIncident() {
    this._incidentService.addIncidents(this.model).subscribe(
      newIncident => {
        this.ngOnInit();
        this.hideForm = true;
        this.model = new Incident();
        this.dataSource.loadLessons();
      }
    );
  }

  onSelect(){
    if(this.model.STATUS == "Open"){
      this.check1 = "true";
      this.check2 = "false";
      this.check3 = "false";
    }
    if(this.model.STATUS == "Report Closed"){
      this.check1 = "false";
      this.check2 = "true";
      this.check3 = "false";
    }
    if(this.model.STATUS == "Special Attention"){
      this.check1 = "false";
      this.check2 = "false";
      this.check3 = "true";
    }
  }
  incidentSelect(dataSource: IncidentsDataSource) {
    this.dataSource = dataSource;
  }

  archiveIncident(incident: Incident) {
    incident.STATUS = 'Closed';
    this._incidentService.updateIncident(incident).subscribe(
      archivedIncident => {
        this.ngOnInit();
      }
    );
  }
}
