import { Component, OnInit, ViewChild, ElementRef, NgZone, AfterViewInit,
         Output, Input, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import {} from '@agm/core/services/google-maps-types';
import { Incident } from '../incident';

@Component({
  selector: 'app-incident-map',
  templateUrl: './incident-map.component.html',
  styleUrls: ['./incident-map.component.css']
})
export class IncidentMapComponent implements OnInit, AfterViewInit {
  public latitude = 40.6990819;
  public longitude = -73.98933879999998;
  public zoom = 18;
  address: string;
  private geoCoder;
  @Input() incident: Incident;
  @Input() loadSubmitButton: boolean;
  @Output() emitLocation = new EventEmitter();
  @Output() emitUpdate = new EventEmitter();


  @ViewChild('search', {static: false}) public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef
  ) { }

  ngAfterViewInit() {
    if ((this.incident.ADDRESS)) {
      this.latitude = Number(this.incident.LATITUDE);
      this.longitude = Number(this.incident.LONGITUDE);
      this.address = this.incident.ADDRESS;
    }
    // create search FormControl
    this.geoCoder = new google.maps.Geocoder();

    // set current position
    this.setCurrentLocation();

    // load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      // tslint:disable: prefer-const
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ['address']
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          // set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.getAddress(this.latitude, this.longitude);
          this.zoom = 18;
        });
      });
    });
    this.cdr.detectChanges();
  }

  ngOnInit() {

  }

  // Get Current Location Coordinates
  private setCurrentLocation() {
    this.zoom = 18;
    this.getAddress(this.latitude, this.longitude);
  }


  markerDragEnd($event: MouseEvent) {
    console.log($event);
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ location: { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 18;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
      this.incident.LATITUDE = this.latitude.toString();
      this.incident.LONGITUDE = this.longitude.toString();
      this.incident.ADDRESS = this.address;
      // This emits address to the form! The incident dropdown page does not look for this!
      this.emitLocation.emit(this.incident);
    });
  }

  // This emits to incident dropdown map, when 'Submit Updated Address' is pressed
  emitAddress() {
    this.incident.LATITUDE = this.latitude.toString();
    this.incident.LONGITUDE = this.longitude.toString();
    this.incident.ADDRESS = this.address;
    this.emitUpdate.emit(this.incident);
  }
}
