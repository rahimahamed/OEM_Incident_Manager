import { Comment } from '../comment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AuthenticationService } from './authentication.service';
import { map } from 'rxjs/operators';
import { variable } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private _postUrl = '/api/comment';

  comments: Array<Comment>;

  constructor(private _http: HttpClient) {}

  addComments(comment: Comment) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._http.post(this._postUrl, JSON.stringify(comment), { headers });
  }

  getComments() {
    return this._http.get(this._postUrl);
  }
}
