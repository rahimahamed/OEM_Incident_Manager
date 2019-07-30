import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-incident-map',
  templateUrl: './incident-map.component.html',
  styleUrls: ['./incident-map.component.css']
})
export class IncidentMapComponent implements OnInit {

  lat = 40.730610;
  lng = -73.935242;

  constructor() { }

  ngOnInit() {
  }

}
