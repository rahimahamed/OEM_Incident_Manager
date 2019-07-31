import { User } from '../user';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: User = {
    firstName: '',
    lastName: '',
    department: '',
    username: '',
    password: '',
    email: ''
  };

  noAuthHeader = { headers: new HttpHeaders({ NoAuth: 'True' }) };

  private _postUrl = '/api/register';

  constructor(private _http: HttpClient) {}

  addUsers(user: User) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._http.post(this._postUrl + JSON.stringify(user), {
      headers
    });
  }

  getAll() {
    return this._http.get<User[]>(this._postUrl);
  }

  register(user: User) {
    return this._http.post(`auth/register`, user);
  }

  delete(id: number) {
    return this._http.delete(`/register/${id}`);
  }

  login(authCredentials) {
    return this._http.post(
      this._postUrl + '/authenticate',
      authCredentials,
      this.noAuthHeader
    );
  }

  getUserProfile() {
    return this._http.get(this._postUrl + '/userProfile');
  }

  //Helper Methods

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    } else return null;
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload) return userPayload.exp > Date.now() / 1000;
    else return false;
  }
}
