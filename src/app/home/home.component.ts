import { Component, OnInit } from '@angular/core';
import { IncidentService } from './../incident.service';
import { Incident } from './../incident';
import { Router, ActivatedRoute } from '@angular/router';
import { IncidentsDataSource } from '../incident.data.source';
import { FormGroup, FormControl } from '@angular/forms';
import { IfStmt } from '@angular/compiler';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

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

  model = new Incident();

  //status;
  prognosis;
  prognosisList = [];
  progTest;

  statusList: any = [
    {
      'statusName': 'Report Closed',
      prognosisList: [
        'Monitoring', 'Response',
      ]
    },
    {
      'statusName': 'Open',
      prognosisList: [
        'Monitoring', 'Response', 'Extended Operation',
      ]
    },
    {
      'statusName': 'Special Attention',
      prognosisList: [
        'Monitoring',
      ]
    }
  ];

  statusChangeAction(statusTitle){
    this.prognosis = "";
    let dropDownData = this.prognosisList.find((data: any) => data.statusName === status)
    if(dropDownData){
      this.prognosisList = dropDownData.prognosisList;
      if(this.prognosisList){
        this.prognosis=this.prognosisList[0];
      }
    } else {
      this.prognosisList = [];
    }
  }


  constructor(private _incidentService: IncidentService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.date = Date.now();
  }

  onClick() {
    console.log('Submit Emergency');
    this.hideForm = !this.hideForm;
  }

  onSubmitIncident() {
    console.log('Hello this is a test');
    console.log(this.progTest);
    this._incidentService.addIncidents(this.model).subscribe(
      newIncident => {
        this.ngOnInit();
        this.hideForm = true;
        this.model = new Incident();
        this.dataSource.loadLessons();
      }
    );
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
