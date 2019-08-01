import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Incident } from '../incident';

@Injectable({
  providedIn: 'root'
})
export class CoreService {
  list: any[] = [];
  list$: BehaviorSubject<any[]> = new BehaviorSubject(this.list);

  constructor(incident: Incident) {
    this.list = this.generateArray(incident);
  }

  generateArray(obj) {
    return Object.keys(obj).map(key => {
      return { key: key, value: obj[key] };
    });
  }

  update(index, field, value) {
    this.list = this.list.map((e, i) => {
      if (index === i) {
        return {
          ...e,
          [field]: value
        };
      }
      return e;
    });
    this.list$.next(this.list);
  }

  getControl(index, fieldName) {}
}
