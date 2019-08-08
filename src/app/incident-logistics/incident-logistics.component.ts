import { Component, OnInit, Input } from '@angular/core';
import { Incident } from '../incident';
import { Supply } from '../supplies';

@Component({
  selector: 'app-incident-logistics',
  templateUrl: './incident-logistics.component.html',
  styleUrls: ['./incident-logistics.component.css']
})
export class IncidentLogisticsComponent implements OnInit {
  @Input() incident: Incident;
  supplies: Supply[] = [];

  constructor() { }

  ngOnInit() {
    const supplyString = this.incident.SUPPLIES;

  }

}
