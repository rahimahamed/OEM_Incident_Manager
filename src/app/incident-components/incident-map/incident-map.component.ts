import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  NgZone,
  AfterViewInit,
  Output,
  Input,
  EventEmitter
} from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { FormControl } from '@angular/forms';
import {} from '@agm/core/services/google-maps-types';
import { Incident } from '../../incident';

@Component({
  selector: 'app-incident-map',
  templateUrl: './incident-map.component.html',
  styleUrls: ['./incident-map.component.css']
})
export class IncidentMapComponent implements OnInit, AfterViewInit {
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  address: string;
  private geoCoder;
  @Input() incident: Incident;
  @Output() emitLocation = new EventEmitter();

  @ViewChild('search', { static: false }) public searchElementRef: ElementRef;

  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) {}

  ngAfterViewInit() {
    this.zoom = 10;
    this.latitude = 40.73061;
    this.longitude = -73.935242;

    // create search FormControl
    this.searchControl = new FormControl();
    this.geoCoder = new google.maps.Geocoder();

    // set current position
    this.setCurrentLocation();

    // load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      // tslint:disable: prefer-const
      let autocomplete = new google.maps.places.Autocomplete(
        this.searchElementRef.nativeElement,
        {
          types: ['address']
        }
      );
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
          this.getAddress(this.latitude, this.longitude, this.incident);
          this.zoom = 15;
        });
      });
    });
  }

  ngOnInit() {}

  // Get Current Location Coordinates
  private setCurrentLocation() {
    this.zoom = 10;
    this.getAddress(this.latitude, this.longitude, this.incident);
  }

  markerDragEnd($event: MouseEvent) {
    console.log($event);
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude, this.incident);
  }

  getAddress(latitude, longitude, incident) {
    this.geoCoder.geocode(
      { location: { lat: latitude, lng: longitude } },
      (results, status) => {
        console.log(results);
        console.log(status);
        if (status === 'OK') {
          if (results[0]) {
            this.zoom = 15;
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
        this.emitLocation.emit(incident);
      }
    );
  }
}
