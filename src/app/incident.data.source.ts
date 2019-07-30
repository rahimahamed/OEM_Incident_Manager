import { BehaviorSubject, Observable, of } from 'rxjs';
import { DataSource, CollectionViewer } from '@angular/cdk/collections';
import { IncidentService } from './incident.service';
import { Incident } from './incident';
import { catchError, finalize } from 'rxjs/operators';

export class IncidentsDataSource implements DataSource<Incident> {

  incidentList: Incident[] = [];
  sortBoolean: boolean = true;
  titleBoolean: boolean = true;
  locationBoolean: boolean = true;
  statusBoolean: boolean = true;


  private lessonsSubject = new BehaviorSubject<Incident[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private incidentService: IncidentService, private loadOpen: boolean) {}

  connect(collectionViewer: CollectionViewer): Observable<Incident[]> {
      return this.lessonsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
      this.lessonsSubject.complete();
      this.loadingSubject.complete();
  }

  loadLessons() {
      this.loadingSubject.next(true);
      if (this.loadOpen) {
        this.incidentService.getIncidents().pipe(
          catchError(() => of([])),
          finalize(() => this.loadingSubject.next(false))
        ) .subscribe((resIncidentData: Incident[]) => {
          for (const incident of resIncidentData) {
            if (!(incident.STATUS === 'Closed')) {
              this.incidentList.push(incident);
            }
          }
          this.lessonsSubject.next(this.incidentList);
          });
      } else {
        this.incidentService.getIncidents().pipe(
          catchError(() => of([])),
          finalize(() => this.loadingSubject.next(false))
        ) .subscribe((resIncidentData: Incident[]) => {
          for (const incident of resIncidentData) {
            if (incident.STATUS === 'Closed') {
              this.incidentList.push(incident);
            }
          }
          this.lessonsSubject.next(this.incidentList);
        });
      }
  }

  sortAlphabetically(numba) {

    switch(numba) {
      case numba=1: {
        this.sortBoolean = this.titleBoolean;
        this.titleBoolean = !this.titleBoolean;
        break;
      }
      case numba=2: {
        this.sortBoolean = this.locationBoolean;
        this.locationBoolean = !this.locationBoolean;
        break;
      }
      case numba=3: {
        this.sortBoolean = this.statusBoolean;
        this.statusBoolean = !this.statusBoolean;
        break;
      }
      default: {
        break;
      }
    }

    if(this.sortBoolean){
      this.incidentList.sort((a, b) => {
        if(a.INCIDENT_NAME > b.INCIDENT_NAME) {
          return 1;
        } else if(a.INCIDENT_NAME < b.INCIDENT_NAME) {
          return -1;
        } else {
          return 0;
        }
      });
      this.lessonsSubject.next(this.incidentList);
      this.sortBoolean = false;
    }
    else{
      this.incidentList.sort((a, b) => {
        if(a.INCIDENT_NAME < b.INCIDENT_NAME) {
          return 1;
        } else if(a.INCIDENT_NAME > b.INCIDENT_NAME) {
          return -1;
        } else {
          return 0;
        }
      });
      this.lessonsSubject.next(this.incidentList);
      this.sortBoolean = true;
    }
  }
}
