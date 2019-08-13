import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IncidentService } from '../incident.service';
import { Incident } from './../incident';
import { Router, ActivatedRoute } from '@angular/router';
import { IncidentsDataSource } from '../incident.data.source';
import { User } from '../user';
import { UserService } from '../user.service';
import { AuthenticationService } from '../authentication.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [IncidentService]
})
export class HomeComponent implements OnInit {
  currentUser: User;
  title = 'NYC Emergency Incident Tracker';
  private hideForm = true;
  private dataSource: IncidentsDataSource;

  @ViewChild('search', { static: false }) public searchElementRef: ElementRef;
  private incidentTypeOther = false;
  private incidentDescriptionOther = false;
  private agencyOther = false;

  private model = new Incident();

  private submitForm = new FormGroup({
    incidentName: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    prognosis: new FormControl('', Validators.required),
    incidentType: new FormControl('', Validators.required),
    otherType: new FormControl('', Validators.required),
    incidentDescription: new FormControl('', Validators.required),
    leadingAgency: new FormControl('', Validators.required),
    supportingAgency: new FormControl()
  });

  statusList: any = [
    {
      statusName: 'Open',
      prognosisList: ['Monitoring', 'Response', 'Extended Operation']
    },
    {
      statusName: 'Special Attention',
      prognosisList: ['Monitoring']
    }
  ];

  prognosisList: any = [];

  constructor(
    private incidentService: IncidentService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.currentUser = localStorage.getItem('currentUser')
      ? JSON.parse(localStorage.getItem('currentUser'))
      : '';
  }

  incidentTypeList: any = [
    {
      incidentTypeName: 'Administration',
      incidentDescriptionList: [
        'Meeting',
        'ChemPack',
        'Planned Event',
        'Planned Notify NYC Message',
        'Other'
      ]
    },
    {
      incidentTypeName: 'Aviation',
      incidentDescriptionList: ['Passenger Aircraft', 'Other']
    },
    {
      incidentTypeName: 'Fire',
      incidentDescriptionList: [
        '1st Alarm',
        '2nd Alarm',
        '6th Alarm',
        'Residential High Rise',
        'Other'
      ]
    },
    {
      incidentTypeName: 'HazMat',
      incidentDescriptionList: ['High Carbon Monoxide', 'Other']
    },
    {
      incidentTypeName: 'Law Enforcement',
      incidentDescriptionList: [
        'Civil Unrest',
        'Device',
        'Explosion',
        'Missing Person',
        'Suspicious Package',
        'Other'
      ]
    },
    {
      incidentTypeName: 'Marine',
      incidentDescriptionList: ['CSO Advisory', 'Other']
    },
    {
      incidentTypeName: 'Medical',
      incidentDescriptionList: ['Injured City Worker', 'Other']
    },
    {
      incidentTypeName: 'Rescue',
      incidentDescriptionList: ['Technical', 'Other']
    },
    {
      incidentTypeName: 'Transportation',
      incidentDescriptionList: ['Car', 'Train Subway', 'Other']
    },
    {
      incidentTypeName: 'Utility',
      incidentDescriptionList: [
        'Electric Feeder Cable',
        'Electric Overhead',
        'Gas Service Line',
        'Manhole',
        'Network Condition',
        'Phone Outage',
        'Power Outage',
        'Sewer Service',
        'Water Main',
        'Water Service Line',
        'Other'
      ]
    },
    {
      incidentTypeName: 'Structural',
      incidentDescriptionList: [
        'Falling Debris',
        'Collapse',
        'Crane',
        'Scaffold',
        'Sidewalk Collapse',
        'Other'
      ]
    },
    {
      incidentTypeName: 'Weather',
      incidentDescriptionList: [
        'Hurricane',
        'Rain',
        'Tropical Depression',
        'Wind',
        'Other'
      ]
    },
    {
      incidentTypeName: 'Other',
      incidentDescriptionList: ['Other']
    }
  ];

  incidentDescriptionList: any = [];

  leadingAgencyList: any = [
    'Aging, Department for the (DFTA)',
    'Amtrak Police (Amtrak PD)',
    'Buildings, Department of (DOB)',
    'Centers for Disease Control and Prevention (CDC)',
    'Consolidated Edison (Con Ed)',
    'Education, Department of (DOE)',
    'Emergency Management, NYC Office of (OEM)',
    'Environmental Protection, Department of (DEP)',
    'Federal Aviation Administration (FAA)',
    'Fire Department EMS Command (FDNY-EMS)',
    'Fire Department, City of New York (FDNY)',
    'Greater New York Hospital Association (GNYHA)',
    'MTA Bridges and Tunnels (MTA B&T)',
    'MTA New York City Transit (MTA)',
    'National Grid',
    'National Weather Service (NWS)',
    'Police Department, New York City (NYPD)',
    'Port Authority of NY/NJ Police (PA-PD)',
    'Public Service Electric and Gas (PSEG)',
    'Transcom',
    'Transportation, Department of (DOT)',
    'Verizon',
    'Other'
  ];

  ngOnInit() {
    this.dataSource = new IncidentsDataSource(this.incidentService, true);
  }

  statusChangeAction() {
    const dropDownData = this.statusList.find(
      (data: any) => data.statusName === this.submitForm.controls.status.value
    );
    if (dropDownData) {
      this.prognosisList = dropDownData.prognosisList;
    } else {
      this.prognosisList = [];
    }
  }

  incidentTypeChangeAction() {
    if (this.submitForm.controls.incidentType.value === 'Other') {
      this.incidentTypeOther = true;
      this.incidentDescriptionOther = true;
      window.setTimeout(() => {
        document.getElementById('other1').focus();
      }, 0);
    } else {
      this.submitForm.controls.otherType.setValue(' ');
      this.incidentTypeOther = false;
      this.incidentDescriptionOther = false;
    }
    const dropDownIncidentData = this.incidentTypeList.find(
      (data2: any) =>
        data2.incidentTypeName === this.submitForm.controls.incidentType.value
    );
    if (dropDownIncidentData) {
      this.incidentDescriptionList =
        dropDownIncidentData.incidentDescriptionList;
    } else {
      this.incidentDescriptionList = [];
    }
  }

  otherDescription() {
    if (this.submitForm.controls.incidentDescription.value === 'Other') {
      this.submitForm.controls.incidentDescription.setValue('');
      this.incidentDescriptionOther = true;
      window.setTimeout(() => {
        document.getElementById('other2').focus();
      }, 0);
    } else {
      this.incidentDescriptionOther = false;
    }
  }

  otherAgency() {
    if (this.submitForm.controls.leadingAgency.value === 'Other') {
      this.submitForm.controls.leadingAgency.setValue('');
      this.agencyOther = true;
      window.setTimeout(() => {
        document.getElementById('other3').focus();
      }, 0);
    } else {
      this.agencyOther = false;
    }
  }

  hasError = (controlName: string, errorName: string) => {
    return this.submitForm.controls[controlName].hasError(errorName);
  };

  onClick() {
    this.hideForm = !this.hideForm;
    this.resetForm();
  }

  resetForm() {
    this.submitForm = new FormGroup({
      incidentName: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
      prognosis: new FormControl('', Validators.required),
      incidentType: new FormControl('', Validators.required),
      otherType: new FormControl('', Validators.required),
      incidentDescription: new FormControl('', Validators.required),
      leadingAgency: new FormControl('', Validators.required),
      supportingAgency: new FormControl()
    });
    window.setTimeout(() => {
      document.getElementById('incidentName').focus();
    }, 0);
    this.model = new Incident();
  }

  onSubmitIncident() {
    const date = new Date();
    this.model.CREATION_DATE =
      '' + date.toISOString().substr(0, 10) + ', ' + date.toLocaleTimeString();
    this.model.MODIFICATION_DATE =
      '' + date.toISOString().substr(0, 10) + ', ' + date.toLocaleTimeString();

    this.model.INCIDENT_NAME = this.submitForm.controls.incidentName.value;
    this.model.LOCATION_NAME = this.submitForm.controls.location.value;
    this.model.STATUS =
      this.submitForm.controls.status.value +
      '-' +
      this.submitForm.controls.prognosis.value;
    if (this.submitForm.controls.incidentType.value === 'Other') {
      this.model.INCIDENT_TYPE =
        this.submitForm.controls.otherType.value +
        '-' +
        this.submitForm.controls.incidentDescription.value;
    } else {
      this.model.INCIDENT_TYPE =
        this.submitForm.controls.incidentType.value +
        '-' +
        this.submitForm.controls.incidentDescription.value;
    }
    this.model.LEAD_AGENCY = this.submitForm.controls.leadingAgency.value;
    this.model.SUPPORTING_AGENCY = this.submitForm.controls.supportingAgency.value;
    this.incidentService.addIncidents(this.model).subscribe(newIncident => {
      this.onClick();
      this.model = new Incident();
      this.dataSource.loadLessons();
    });
  }

  setLocation(incident: Incident) {
    console.log('Setting Location in the Home Component');
    this.model.ADDRESS = incident.ADDRESS;
    this.model.LATITUDE = incident.LATITUDE;
    this.model.LONGITUDE = incident.LONGITUDE;
  }
}
