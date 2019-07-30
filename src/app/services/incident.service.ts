import { Incident } from '../incident';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AuthenticationService } from './auth.service';
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

  options;
  domain = this.authService.domain;

  incidents: Array<Incident>;

  constructor(
    private _http: HttpClient,
    private authService: AuthenticationService
  ) {}

  // Function to create headers, add token, to be used in HTTP requests
  createAuthenticationHeaders() {
    this.authService.loadToken(); // Get token so it can be attached to headers
    // Headers configuration options
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json', // Format set to JSON
        authorization: this.authService.authToken // Attach token
      })
    });
  }

  getIncidents() {
    return this._http.get(this._getUrl);
  }

  addIncidents(incident: Incident) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._http.post(this._postUrl, JSON.stringify(incident), {
      headers
    });
  }

  deleteIncident(incident: Incident) {
    return this._http.delete(this._deleteUrl + incident._id);
  }

  updateIncident(incident: Incident) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._http.put(
      this._putUrl + incident._id,
      JSON.stringify(incident),
      { headers }
    );
  }

  postComment(id, comment) {
    this.createAuthenticationHeaders();
    const blogData = {
      id: id,
      comment: comment
    };
    return this._http
      .post(this.domain + 'api/comment', blogData, this.options)
      .pipe(map(response => console.log(response)));
  }
}
