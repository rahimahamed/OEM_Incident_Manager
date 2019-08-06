import { BehaviorSubject, Observable, of } from 'rxjs';
import { DataSource, CollectionViewer } from '@angular/cdk/collections';
import { CommentService } from '../services/comment.service';
import { Comment } from '../comment';
import { catchError, finalize } from 'rxjs/operators';

export class CommentsDataSource implements DataSource<Comment> {
  commentList: Comment[] = [];

  private lessonsSubject = new BehaviorSubject<Comment[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private commentService: CommentService) {}

  connect(collectionViewer: CollectionViewer): Observable<Comment[]> {
    return this.lessonsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.lessonsSubject.complete();
    this.loadingSubject.complete();
  }

  loadLessons() {
    this.commentList.length = 0;
    this.loadingSubject.next(true);
    this.commentService
      .getComments()
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((resCommentData: Comment[]) => {
        for (const comment of resCommentData) {
          this.commentList.push(comment);
        }
        this.lessonsSubject.next(this.commentList);
      });
  }
}
