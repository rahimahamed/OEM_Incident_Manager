import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Incident } from '../../../incident';
import { User } from '../../../user';

import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { Comment } from '../../../comment';
import { CommentService } from '../../../services/comment.service';
import { AuthenticationService } from '../../../services/authentication.service';

import { CommentsDataSource } from '../../../helpers/comment.data.source';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-incident-comments-list',
  templateUrl: './incident-comments-list.component.html',
  styleUrls: ['./incident-comments-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      )
    ])
  ]
})
export class IncidentCommentsListComponent implements OnInit {
  @Input() dataSource: CommentsDataSource;
  @Input() incident: Incident;
  @Input() comment: Comment;

  @Output() closeF = new EventEmitter();
  @Output() selectComment = new EventEmitter();
  @Output() deleteComment = new EventEmitter();

  columnsToDisplay = ['commentator', 'comment'];
  expandedElement: Comment | null;

  constructor(private commentService: CommentService) {}

  idMatch() {
    if (this.comment.incident_id == this.incident._id) {
      return true;
    } else {
      return false;
    }
  }

  ngOnInit() {
    this.dataSource = new CommentsDataSource(this.commentService);
    this.dataSource.loadLessons();
  }

  onSelect() {
    this.selectComment.emit(this.dataSource);
  }

  onDelete(comment: Comment) {
    this.deleteComment.emit(comment);
  }
}
