
import { Component, OnInit, ViewChild, ElementRef, } from '@angular/core';
import { IncidentService } from './../incident.service';
import { Incident } from './../incident';
import { Router, ActivatedRoute } from '@angular/router';
import { IncidentsDataSource } from '../incident.data.source';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

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
  private incidentTypeOther = false;
  private incidentDescriptionOther = false;
  private agencyOther = false;

  @ViewChild('search', {static: false}) public searchElementRef: ElementRef;

  model = new Incident();

  submitForm = new FormGroup({
    incidentName: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    prognosis: new FormControl('', Validators.required),
    incidentType: new FormControl('', Validators.required),
    otherType: new FormControl('', Validators.required),
    incidentDescription: new FormControl('', Validators.required),
    otherDescription: new FormControl(''),
    leadingAgency: new FormControl('', Validators.required),
    otherAgency: new FormControl(''),
    supportingAgency: new FormControl(),

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

  incidentTypeList: any = [
    {
      incidentTypeName: 'Administration',
      incidentDescriptionList: [
        'Meeting', 'ChemPack', 'Planned Event', 'Planned Notify NYC Message', 'Other'
      ]
    },
    {
      incidentTypeName: 'Aviation',
      incidentDescriptionList: [
        'Passenger Aircraft', 'Other'
      ]
    },
    {
      incidentTypeName: 'Fire',
      incidentDescriptionList: [
        '1st Alarm', '2nd Alarm', '6th Alarm','Residential High Rise', 'Other'
      ]
    },
    {
      incidentTypeName: 'HazMat',
      incidentDescriptionList: [
        'High Carbon Monoxide', 'Other'
      ]
    },
    {
      incidentTypeName: 'Law Enforcement',
      incidentDescriptionList: [
        'Civil Unrest', 'Device', 'Explosion', 'Missing Person', 'Suspicious Package', 'Other'
      ]
    },
    {
      incidentTypeName: 'Marine',
      incidentDescriptionList: [
        'CSO Advisory', 'Other'
      ]
    },
    {
      incidentTypeName: 'Medical',
      incidentDescriptionList: [
        'Injured City Worker', 'Other'
      ]
    },
    {
      incidentTypeName: 'Rescue',
      incidentDescriptionList: [
        'Technical', 'Other'
      ]
    },
    {
      incidentTypeName: 'Transportation',
      incidentDescriptionList: [
        'Car', 'Train Subway', 'Other'
      ]
    },
    {
      incidentTypeName: 'Utility',
      incidentDescriptionList: [
        'Electric Feeder Cable', 'Electric Overhead', 'Gas Service Line', 'Manhole',
        'Network Condition', 'Phone Outage', 'Power Outage', 'Sewer Service', 'Water Main',
        'Water Service Line', 'Other'
      ]
    },
    {
      incidentTypeName: 'Structural',
      incidentDescriptionList: [
        'Falling Debris', 'Collapse', 'Crane', 'Scaffold', 'Sidewalk Collapse',  'Other'
      ]
    },
    {
      incidentTypeName: 'Weather',
      incidentDescriptionList: [
        'Hurricane', 'Rain', 'Tropical Depression', 'Wind', 'Other'
      ]
    },
    {
      incidentTypeName: 'Other',
      incidentDescriptionList: [
        'Other'
      ]
    }

  ];

  incidentDescriptionList: any = [];

  leadingAgencyList: any = [
    'Aging, Department for the (DFTA)', 'Amtrak Police (Amtrak PD)',
    'Buildings, Department of (DOB)', 'Centers for Disease Control and Prevention (CDC)',
    'Consolidated Edison (Con Ed)', 'Education, Department of (DOE)',
    'Emergency Management, NYC Office of (OEM)', 'Environmental Protection, Department of (DEP)',
    'Federal Aviation Administration (FAA)', 'Fire Department EMS Command (FDNY-EMS)',
    'Fire Department, City of New York (FDNY)', 'Greater New York Hospital Association (GNYHA)',
    'MTA Bridges and Tunnels (MTA B&T)', 'MTA New York City Transit (MTA)',
    'National Grid', 'National Weather Service (NWS)', 'Police Department, New York City (NYPD)',
    'Port Authority of NY/NJ Police (PA-PD)', 'Public Service Electric and Gas (PSEG)',
    'Transcom', 'Transportation, Department of (DOT)', 'Verizon', 'Other'
  ];
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

  incidentTypeChangeAction(){
    if(this.submitForm.controls.incidentType.value === 'Other'){
      //this.submitForm.controls.incidentType.setValue();
      this.incidentTypeOther = true;
      this.incidentDescriptionOther =true;
      window.setTimeout(function (){
        document.getElementById('other1').focus();
      }, 0);
    } else {
      this.incidentTypeOther = false;
      this.incidentDescriptionOther = false;
    }
    const dropDownIncidentData = this.incidentTypeList.find((data2: any) =>
            data2.incidentTypeName === this.submitForm.controls.incidentType.value);
    if(dropDownIncidentData){
      this.incidentDescriptionList = dropDownIncidentData.incidentDescriptionList;
    } else {
      this.incidentDescriptionList = [];
    }
  }

  otherDescription(){
    if(this.submitForm.controls.incidentDescription.value === 'Other'){
      this.submitForm.controls.incidentDescription.setValue(' ');
      this.incidentDescriptionOther = true;
      window.setTimeout(function (){
        document.getElementById('other2').focus();
      }, 0);
    } else {
      this.incidentDescriptionOther = false;
    }
  }

  otherAgency(){
    if(this.submitForm.controls.leadingAgency.value === 'Other'){
      this.submitForm.controls.leadingAgency.setValue('');
      this.agencyOther = true;
      window.setTimeout(function (){
        document.getElementById('other3').focus();
      }, 0);

    } else {
      this.agencyOther = false;
    }
  }

  onClick() {
    console.log('Submit Emergency');
    this.updateForm = false;
    this.hideForm = !this.hideForm;
    this.model = new Incident();
  }

  hasError = (controlName: string, errorName: string) => {
    return this.submitForm.controls[controlName].hasError(errorName);
  }

  onSubmitIncident() {
    this.model.INCIDENT_NAME = this.submitForm.controls.incidentName.value;
    this.model.LOCATION_NAME = this.submitForm.controls.location.value;
    this.model.STATUS = this.submitForm.controls.status.value + '-' + this.submitForm.controls.prognosis.value;
    if(this.submitForm.controls.incidentType.value === 'Other'){
      this.model.INCIDENT_TYPE =  this.submitForm.controls.otherType.value + '-' + this.submitForm.controls.incidentDescription.value;
    } else {
      this.model.INCIDENT_TYPE =  this.submitForm.controls.incidentType.value + '-' + this.submitForm.controls.incidentDescription.value;
    }
    this.model.LEAD_AGENCY = this.submitForm.controls.leadingAgency.value;
    this.model.SUPPORTING_AGENCY = this.submitForm.controls.supportingAgency.value;
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
