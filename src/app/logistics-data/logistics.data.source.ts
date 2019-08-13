import { BehaviorSubject, Observable, of } from 'rxjs';
import { DataSource, CollectionViewer } from '@angular/cdk/collections';
import { catchError, finalize } from 'rxjs/operators';
import { Supply } from '../supplies';
import { LogisticsDataService } from './logistics-data.service';

export class LogisticsDataSource implements DataSource<Supply> {
  private supplyList: Supply[] = [];
  private supplyList2: Supply[] = [];

  private lessonsSubject = new BehaviorSubject<Supply[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(
    private logisticsService: LogisticsDataService,
  ) {}

  connect(collectionViewer: CollectionViewer): Observable<Supply[]> {
    return this.lessonsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.lessonsSubject.complete();
    this.loadingSubject.complete();
  }

  getData() {
    return this.supplyList;
  }

  loadSupplies() {
    this.supplyList.length = 0;
    this.loadingSubject.next(true);
    this.logisticsService.getSupplies()
    .pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
    )
    .subscribe((resSupplies: Supply[]) => {
      for (const supply of resSupplies) {
        this.supplyList.push(supply);
      }
      this.lessonsSubject.next(this.supplyList);
    });
  }

  addSupply(supply: Supply) {
    this.logisticsService.addSupplies(supply).subscribe(
      newSupply => {
        this.supplyList.push(newSupply as Supply);
        this.lessonsSubject.next(this.supplyList);
      }
    )
  }

  updateSupplies(supply: Supply) {
    this.logisticsService.updateSupplies(supply).subscribe(
      newSupply => {
        this.loadSupplies();
      }
    );
  }

  deleteSupplies(supply: Supply) {
    this.logisticsService.deleteSupplies(supply).subscribe(
      newSupply => {
        this.loadSupplies();
      }
    );
  }

  filter(str: string) {
    this.supplyList2.length = 0;
    this.loadingSubject.next(true);
    for (const supply of this.supplyList) {
      if (supply.SUPPLY_NAME.toLowerCase().includes(str)) {
        this.supplyList2.push(supply);
      } else if (supply.SUPPLY_QUANTITY.toLowerCase().includes(str)) {
        this.supplyList2.push(supply);
      } else if (supply.SUPPLY_UNIT.toLowerCase().includes(str)) {
        this.supplyList2.push(supply);
      }
    }
    this.lessonsSubject.next(this.supplyList2);
  }

  sortName() {
    // if (this.titleBoolean) {
    //   this.incidentList.sort((a, b) => {
    //       if (a.INCIDENT_NAME.toLowerCase() > b.INCIDENT_NAME.toLowerCase()) {
    //         return 1;
    //       } else if (
    //         a.INCIDENT_NAME.toLowerCase() < b.INCIDENT_NAME.toLowerCase()
    //       ) {
    //         return -1;
    //       } else {
    //         return 0;
    //       }
    //   });
    //   this.lessonsSubject.next(this.incidentList);
    //   this.titleBoolean = false;
    // } else {
    //   this.incidentList.sort((a, b) => {
    //       if (a.INCIDENT_NAME.toLowerCase() < b.INCIDENT_NAME.toLowerCase()) {
    //         return 1;
    //       } else if (
    //         a.INCIDENT_NAME.toLowerCase() > b.INCIDENT_NAME.toLowerCase()
    //       ) {
    //         return -1;
    //       } else {
    //         return 0;
    //       }
    //   });
    //   this.lessonsSubject.next(this.incidentList);
    //   this.titleBoolean = true;
    // }
  }

  sortLocation() {
    // if (this.locationBoolean) {
    //   this.incidentList.sort((a, b) => {
    //       if (a.LOCATION_NAME.toLowerCase() > b.LOCATION_NAME.toLowerCase()) {
    //         return 1;
    //       } else if (
    //         a.LOCATION_NAME.toLowerCase() < b.LOCATION_NAME.toLowerCase()
    //       ) {
    //         return -1;
    //       } else {
    //         return 0;
    //       }
    //   });
    //   this.lessonsSubject.next(this.incidentList);
    //   this.locationBoolean = false;
    // } else {
    //   this.incidentList.sort((a, b) => {
    //       if (a.LOCATION_NAME.toLowerCase() < b.LOCATION_NAME.toLowerCase()) {
    //         return 1;
    //       } else if (
    //         a.LOCATION_NAME.toLowerCase() > b.LOCATION_NAME.toLowerCase()
    //       ) {
    //         return -1;
    //       } else {
    //         return 0;
    //       }
    //   });
    //   this.lessonsSubject.next(this.incidentList);
    //   this.locationBoolean = true;
    // }
  }

  sortStatus() {
    // if (this.statusBoolean) {
    //   this.incidentList.sort((a, b) => {
    //       if (a.STATUS.toLowerCase() > b.STATUS.toLowerCase()) {
    //         return 1;
    //       } else if (
    //         a.STATUS.toLowerCase() < b.STATUS.toLowerCase()
    //       ) {
    //         return -1;
    //       } else {
    //         return 0;
    //       }
    //   });
    //   this.lessonsSubject.next(this.incidentList);
    //   this.statusBoolean = false;
    // } else {
    //   this.incidentList.sort((a, b) => {
    //       if (a.STATUS.toLowerCase() < b.STATUS.toLowerCase()) {
    //         return 1;
    //       } else if (
    //         a.STATUS.toLowerCase() > b.STATUS.toLowerCase()
    //       ) {
    //         return -1;
    //       } else {
    //         return 0;
    //       }
    //   });
    //   this.lessonsSubject.next(this.incidentList);
    //   this.statusBoolean = true;
    // }
  }


}
