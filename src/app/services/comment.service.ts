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

  options;
  domain = this.authService.domain;

  constructor(
    private _http: HttpClient,
    private authService: AuthenticationService
  ) {}

  // // Function to create headers, add token, to be used in HTTP requests
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

  addComments(comment: Comment) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._http.post(this._postUrl, JSON.stringify(comment), { headers });
  }

  getComments() {
    this.createAuthenticationHeaders(); // Create headers
    return this._http.get(this._postUrl);
  }

  deleteComment(comment: Comment) {
    return this._http.delete(this._postUrl + comment._id);
  }
}
