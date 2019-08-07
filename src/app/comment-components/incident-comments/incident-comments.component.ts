import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Incident } from '../../incident-components/incident';
import { User } from '../../user-components/user';

import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { Comment } from '../../comment-components/comment';
import { CommentService } from '../../services/comment.service';
import { AuthenticationService } from '../../services/authentication.service';

import { CommentsDataSource } from '../../helpers/comment.data.source';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-incident-comments',
  templateUrl: './incident-comments.component.html',
  styleUrls: ['./incident-comments.component.css']
})
export class IncidentCommentsComponent implements OnInit {
  @Input() incident: Incident;

  currentUser: User;
  currentUserSubscription: Subscription;
  currentIncident: Incident;
  dataSource: CommentsDataSource;

  private hideForm = true;

  @ViewChild('search', { static: false }) public searchElementRef: ElementRef;

  model = new Comment();

  submitComment = new FormGroup({
    comment: new FormControl(this.model.comment),
    commentator: new FormControl(this.model.commentator)
  });

  constructor(
    private authenticationService: AuthenticationService,
    private commentService: CommentService
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(
      user => {
        this.currentUser = user;
      },

      (this.currentIncident = localStorage.getItem('currentIncident')
        ? JSON.parse(localStorage.getItem('currentIncident'))
        : '')
    );
  }

  ngOnInit() {}

  onClick() {
    console.log('Submit comment');
    this.hideForm = !this.hideForm;
    this.model = new Comment();
  }

  onSubmitComment() {
    console.log(this.model.comment);
    this.model.comment = this.submitComment.controls.comment.value;
    console.log(this.model.commentator);
    this.model.commentator = this.submitComment.controls.commentator.value;
    this.commentService.addComments(this.model).subscribe(newComment => {
      this.ngOnInit();
      this.onClick();
      this.model = new Comment();
      this.dataSource.loadLessons();
    });
  }

  closeForm() {
    this.hideForm = true;
  }

  commentSelect(dataSource: CommentsDataSource) {
    this.dataSource = dataSource;
  }
}
