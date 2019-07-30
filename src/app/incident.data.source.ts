import { BehaviorSubject, Observable, of } from "rxjs";
import { DataSource, CollectionViewer } from "@angular/cdk/collections";
import { IncidentService } from "./incident.service";
import { Incident } from "./incident";
import { catchError, finalize } from "rxjs/operators";

export class IncidentsDataSource implements DataSource<Incident> {
  incidentList: Incident[] = [];
  titleBoolean: boolean = true;
  locationBoolean: boolean = true;
  statusBoolean: boolean = true;

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
    this.incidentList = [];
    this.loadingSubject.next(true);
    if (this.loadOpen) {
      this.incidentService
        .getIncidents()
        .pipe(
          catchError(() => of([])),
          finalize(() => this.loadingSubject.next(false))
        )
        .subscribe((resIncidentData: Incident[]) => {
          for (const incident of resIncidentData) {
            if (!(incident.STATUS === "Closed")) {
              this.incidentList.push(incident);
            }
          }
          this.lessonsSubject.next(this.incidentList);
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
            if (incident.STATUS === "Closed") {
              this.incidentList.push(incident);
            }
          }
          this.lessonsSubject.next(this.incidentList);
        });
    }
  }

  sortName() {
    if (this.titleBoolean) {
      this.incidentList.sort((a, b) => {
          if (a.INCIDENT_NAME.toLowerCase() > b.INCIDENT_NAME.toLowerCase()) {
            return 1;
          } else if (
            a.INCIDENT_NAME.toLowerCase() < b.INCIDENT_NAME.toLowerCase()
          ) {
            return -1;
          } else {
            return 0;
          }
      });
      this.lessonsSubject.next(this.incidentList);
      this.titleBoolean = false;
    } else {
      this.incidentList.sort((a, b) => {
          if (a.INCIDENT_NAME.toLowerCase() < b.INCIDENT_NAME.toLowerCase()) {
            return 1;
          } else if (
            a.INCIDENT_NAME.toLowerCase() > b.INCIDENT_NAME.toLowerCase()
          ) {
            return -1;
          } else {
            return 0;
          }
      });
      this.lessonsSubject.next(this.incidentList);
      this.titleBoolean = true;
    }
  }

  sortLocation() {
    if (this.locationBoolean) {
      this.incidentList.sort((a, b) => {
          if (a.LOCATION_NAME.toLowerCase() > b.LOCATION_NAME.toLowerCase()) {
            return 1;
          } else if (
            a.LOCATION_NAME.toLowerCase() < b.LOCATION_NAME.toLowerCase()
          ) {
            return -1;
          } else {
            return 0;
          }
      });
      this.lessonsSubject.next(this.incidentList);
      this.locationBoolean = false;
    } else {
      this.incidentList.sort((a, b) => {
          if (a.LOCATION_NAME.toLowerCase() < b.LOCATION_NAME.toLowerCase()) {
            return 1;
          } else if (
            a.LOCATION_NAME.toLowerCase() > b.LOCATION_NAME.toLowerCase()
          ) {
            return -1;
          } else {
            return 0;
          }
      });
      this.lessonsSubject.next(this.incidentList);
      this.locationBoolean = true;
    }
  }

  sortStatus() {
    if (this.statusBoolean) {
      this.incidentList.sort((a, b) => {
          if (a.STATUS.toLowerCase() > b.STATUS.toLowerCase()) {
            return 1;
          } else if (
            a.STATUS.toLowerCase() < b.STATUS.toLowerCase()
          ) {
            return -1;
          } else {
            return 0;
          }
      });
      this.lessonsSubject.next(this.incidentList);
      this.statusBoolean = false;
    } else {
      this.incidentList.sort((a, b) => {
          if (a.STATUS.toLowerCase() < b.STATUS.toLowerCase()) {
            return 1;
          } else if (
            a.STATUS.toLowerCase() > b.STATUS.toLowerCase()
          ) {
            return -1;
          } else {
            return 0;
          }
      });
      this.lessonsSubject.next(this.incidentList);
      this.statusBoolean = true;
    }
  }

  filter(str: string) {
    this.incidentList = [];
    this.loadingSubject.next(true);
    if (this.loadOpen) {
      this.incidentService
        .getIncidents()
        .pipe(
          catchError(() => of([])),
          finalize(() => this.loadingSubject.next(false))
        )
        .subscribe((resIncidentData: Incident[]) => {
          for (const incident of resIncidentData) {
            if (!(incident.STATUS === "Closed")) {
              if (incident.STATUS.toLowerCase().includes(str)) {
                this.incidentList.push(incident);
              } else if (incident.INCIDENT_NAME.toLowerCase().includes(str)) {
                this.incidentList.push(incident);
              } else if (incident.LOCATION_NAME.toLowerCase().includes(str)) {
                this.incidentList.push(incident);
              }
            }
          }
          this.lessonsSubject.next(this.incidentList);
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
            if (incident.STATUS === "Closed") {
              if (incident.STATUS.toLowerCase().includes(str)) {
                this.incidentList.push(incident);
              } else if (incident.INCIDENT_NAME.toLowerCase().includes(str)) {
                this.incidentList.push(incident);
              } else if (incident.LOCATION_NAME.toLowerCase().includes(str)) {
                this.incidentList.push(incident);
              }
            }
          }
          this.lessonsSubject.next(this.incidentList);
        });
    }
  }
}
