import { BehaviorSubject, Observable, of } from 'rxjs';
import { DataSource, CollectionViewer } from '@angular/cdk/collections';
import { IncidentService } from './incident.service';
import { Incident } from './incident';
import { catchError, finalize } from 'rxjs/operators';
import { MatTableDataSource } from '@Angular/material';

export class IncidentsDataSource implements DataSource<Incident> {

  private lessonsSubject = new BehaviorSubject<Incident[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private incidentService: IncidentService) {}

  connect(collectionViewer: CollectionViewer): Observable<Incident[]> {
      return this.lessonsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
      this.lessonsSubject.complete();
      this.loadingSubject.complete();
  }

  loadLessons() {
      this.loadingSubject.next(true);

      this.incidentService.getIncidents().pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      ) .subscribe((resIncidentData: Incident[]) => {
        this.lessonsSubject.next(resIncidentData);
      });
  }
}
