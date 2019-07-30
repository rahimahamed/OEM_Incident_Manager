import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private url = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
  private api = '&key=AIzaSyDr8Sz6cBrbbQ3-rlzpO25xAHLMW71Pwck';

  constructor(private _http: HttpClient) { }

  getIncidents(address: string) {
    let add = address.replace(' ', '+');
    return this._http.get(this.url + add + this.api);
  }


}
