import { Incident } from './incident';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { variable } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {

  private _getUrl = '/api/active';
  private _postUrl = '/api/active';
  private _putUrl = '/api/active/';
  private _deleteUrl = '/api/active/';

  incidents: Array<Incident>;

  constructor(private _http: HttpClient) { }

  getIncidents() {
    return this._http.get(this._getUrl);
  }

  addIncidents(incident: Incident) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._http.post(this._postUrl, JSON.stringify(incident), { headers });
  }

  deleteIncident(incident: Incident) {
    return this._http.delete(this._deleteUrl + incident._id);
  }

  updateIncident(incident: Incident) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._http.put(this._putUrl + incident._id, JSON.stringify(incident), {headers});
  }
}
