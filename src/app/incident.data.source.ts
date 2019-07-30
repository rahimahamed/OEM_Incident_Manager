import { BehaviorSubject, Observable, of } from 'rxjs';
import { DataSource, CollectionViewer } from '@angular/cdk/collections';
import { IncidentService } from './services/incident.service';
import { Incident } from './incident';
import { catchError, finalize } from 'rxjs/operators';

export class IncidentsDataSource implements DataSource<Incident> {
  private lessonsSubject = new BehaviorSubject<Incident[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(
    private incidentService: IncidentService,
    private loadOpen: boolean
  ) {}

  connect(collectionViewer: CollectionViewer): Observable<Incident[]> {
    return this.lessonsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.lessonsSubject.complete();
    this.loadingSubject.complete();
  }

  loadLessons() {
    this.loadingSubject.next(true);
    const incidentList: Incident[] = [];
    if (this.loadOpen) {
      this.incidentService
        .getIncidents()
        .pipe(
          catchError(() => of([])),
          finalize(() => this.loadingSubject.next(false))
        )
        .subscribe((resIncidentData: Incident[]) => {
          for (const incident of resIncidentData) {
            if (!(incident.STATUS === 'Closed')) {
              incidentList.push(incident);
            }
          }
          this.lessonsSubject.next(incidentList);
        });
    } else {
      this.incidentService
        .getIncidents()
        .pipe(
          catchError(() => of([])),
          finalize(() => this.loadingSubject.next(false))
        )
        .subscribe((resIncidentData: Incident[]) => {
          for (const incident of resIncidentData) {
            if (incident.STATUS === 'Closed') {
              incidentList.push(incident);
            }
          }
          this.lessonsSubject.next(incidentList);
        });
    }
  }
}
