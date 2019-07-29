import {User} from "./user";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })

export class UserService {
    private _getUrl = '/api/users';
    private _postUrl = '/api/users';
    private _putUrl = '/api/users/';
    private _deleteUrl = '/api/users/';

    users: Array<User>;

    constructor(private _http: HttpClient) { }

    addUsers(user: User) {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._http.post(this._postUrl, JSON.stringify(user), { headers });
    }
}