import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LogisticsDataService {

  private url = '/api/active';

  constructor(private _http: HttpClient) { }

  getIncidents() {
    return this._http.get(this.url);
  }

}
