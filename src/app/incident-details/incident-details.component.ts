import { Component, OnInit, Input } from '@angular/core';
import { Incident } from '../incident';

@Component({
  selector: 'app-incident-details',
  templateUrl: './incident-details.component.html',
  styleUrls: ['./incident-details.component.css']
})
export class IncidentDetailsComponent implements OnInit {

  @Input() incident: Incident;

  columnsToDisplay = ['title', 'location', 'status'];

  constructor() { }

  ngOnInit() {
  }

  generateArray(obj){
    return Object.keys(obj).map((key)=>{ return {key:key, value:obj[key]}});
  }
}
