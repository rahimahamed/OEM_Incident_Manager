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

  /*public isDisabledPrognosis: boolean = true;

  public defaultStatus: { statusName: string, statusId: number} = { statusName: "Select A Status", statusId: null};
  public defaultPrognosis: { prognosisName: string, prognosisId: number} = { prognosisName: "Select a Prognosis", prognosisId: null};

  public statusCategory: Array<{ statusName: string, statusId: number}> = [
    {statusName: "Report Closed", statusId: 0},
    {statusName: "Open", statusId: 1},
    {statusName: "Special Attention", statusId: 2}
  ];

  public statusPrognosis: Array<{ prognosisName: string, prognosisId: number, statusId: number}> = [
    {prognosisName: "Monitoring", prognosisId: 0, statusId: 0},
    {prognosisName: "Response", prognosisId: 1, statusId: 0},
    {prognosisName: "Monitoring", prognosisId: 2, statusId: 1},
    {prognosisName: "Response", prognosisId: 3, statusId: 1},
    {prognosisName: "Extended Operation", prognosisId: 4, statusId: 1},
    {prognosisName: "Monitoring", prognosisId: 5, statusId: 2},
  ]

  public dataResultPrognosis: Array<{prognosisName: string, prognosisId: number, statusId: number}>;

  public selectedStatus: {statusName: string, statusId: number};
  public selectedPrognosis: {prognosisName: string, prognosisId: number};

  handleStatusChange(value){
    this.selectedStatus = value;
    this.selectedPrognosis = undefined;
    console.log(this.selectedStatus.statusName);

    if(value.statusId == this.defaultStatus.statusId){
      this.isDisabledPrognosis = true;
      this.dataResultPrognosis = [];
    } else {
      this.isDisabledPrognosis = false;
      this.dataResultPrognosis = this.statusPrognosis.filter((s) => s.statusId === value.statusId)
    }
  }*/


  private formGroup = new FormGroup({
    status: new FormControl([]),
    prognosis: new FormControl([])
  })


  private fromArrayObjectToArrayOfOptions = (val : any[]) => (val.reduce((pre, elem) => [...pre, elem.options], []));
  private fromArrayOfArraysToArray = (val) => (val.flat());

  private subSource$ = this.formGroup.get('status').valueChanges.pipe(
    map(this.fromArrayObjectToArrayOfOptions),
    map(this.fromArrayOfArraysToArray));


  private source$ = of([
    {type: "Closed", options: [{prognosis: "Monitoring"}, {prognosis: "Response"}]},
    {type: "Open", options: [{prognosis: "Monitoring"}, {prognosis: "Response"}, {prognosis: "Extended Operation"}]},
    {type: "Special Attention", options: [{prognosis: "Monitoring"}]},
  ]);




  model = new Incident();

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
