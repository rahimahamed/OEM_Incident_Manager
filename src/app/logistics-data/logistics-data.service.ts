import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Supply } from '../supplies';

@Injectable({
  providedIn: 'root'
})
export class LogisticsDataService {

  private url = '/api/logisticsdata/';

  constructor(private _http: HttpClient) { }

  getSupplies() {
    return this._http.get(this.url);
  }

  getID(id: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._http.get(this.url + '/' + id, {headers});
  }

  addSupplies(supply: Supply) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._http.post(this.url, JSON.stringify(supply), { headers });
  }

  deleteSupplies(supply: Supply) {
    return this._http.delete(this.url + supply._id);
  }

  updateSupplies(supply: Supply) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._http.put(this.url + supply._id, JSON.stringify(supply), {headers});
  }

}
