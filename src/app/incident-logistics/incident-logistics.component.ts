import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Incident } from '../incident';
import { Supply } from '../supplies';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LogisticsDataService } from '../logistics-data/logistics-data.service';
import { catchError, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-incident-logistics',
  templateUrl: './incident-logistics.component.html',
  styleUrls: ['./incident-logistics.component.css']
})
export class IncidentLogisticsComponent implements OnInit {
  @Input() incident: Incident;
  @Output() updateIncident = new EventEmitter();
  supplies: Supply[] = [];
  newSup = false;
  selected = 'Jackets';

  private submitForm = new FormGroup({
    incidentSupply: new FormControl(''),
  });

  @Input() supplyList: Supply[];

  constructor(
    private logisticsService: LogisticsDataService
  ) {
    // logisticsService.getSupplies().subscribe(
    //   resSup => {
    //     for (const supply of resSup as Supply[]) {
    //       this.supplyList.push(supply);
    //     }
    //   }
    // );
  }

  ngOnInit() {
    // this.logisticsService.getSupplies().subscribe(
    //   resSup => {
    //     for (const supply of resSup as Supply[]) {
    //       this.supplyList.push(supply);
    //     }
    //   }
    // );
    if (this.incident.SUPPLIES) {
      this.stringToSupply(this.incident.SUPPLIES);
    }
  }

  remaining(name: string) {
    if (name === 'selected') {
      return this.supplyList.find((supply: Supply) =>
        supply.SUPPLY_NAME === this.selected).SUPPLY_QUANTITY;
    } else {
      return this.supplyList.find((supply: Supply) =>
        supply.SUPPLY_NAME === name).SUPPLY_QUANTITY;
    }
  }

  stringToSupply(supplyString: string) {
    console.log(supplyString);
    const initSplit: string[] = supplyString.split('%');
    for (const supply of initSplit) {
      const split = supply.split('*');
      const supplyToPush = new Supply();
      supplyToPush.SUPPLY_NAME = split[0];
      supplyToPush.SUPPLY_UNIT = split[1];
      supplyToPush.SUPPLY_QUANTITY = split[2];
      console.log(supplyToPush);
      this.supplies.push(supplyToPush);
    }
  }

  supplyToString() {
    let supplyString = '';
    for (const supply of this.supplies) {
      let supS = '';
      supS += supply.SUPPLY_NAME + '*';
      supS += supply.SUPPLY_UNIT + '*';
      supS += supply.SUPPLY_QUANTITY;
      supplyString += supS + '%';
    }
    return supplyString.substring(0, supplyString.length - 1);
  }

  returnUnit() {
    return this.supplyList.find((supply: Supply) =>
            supply.SUPPLY_NAME === this.selected).SUPPLY_UNIT;
  }

  containsSupply(supply: Supply) {
    for(const sup of this.supplies) {
      if (sup.SUPPLY_NAME === supply.SUPPLY_NAME) {
        return false;
      }
    }
    return true;
  }

  updateList(id: string, event: any) {
    const editField = event.target.textContent;
  }

  clickAdd(supply: Supply, index) {
    console.log(this.selected);
    const count = Number(supply.SUPPLY_QUANTITY) + 1;
    this.supplies[index].SUPPLY_QUANTITY = count.toString();
  }

  clickAddd() {
    const count = Number(document.getElementById('newSupply').textContent) + 1;
    document.getElementById('newSupply').textContent = count.toString();
  }

  clickRemovee() {
    if (this.validCount(Number(document.getElementById('newSupply').textContent))) {
      const count = Number(document.getElementById('newSupply').textContent) - 1;
      document.getElementById('newSupply').textContent = count.toString();
    }
  }

  clickRemove(supply: Supply, index) {
    if (this.validCount(Number(supply.SUPPLY_QUANTITY))) {
      const count = Number(supply.SUPPLY_QUANTITY) - 1;
      this.supplies[index].SUPPLY_QUANTITY = count.toString();
    }
  }

  validCount(count: number) {
    if (count <= 0) {
      return false;
    } else {
      return true;
    }
  }

  changeValue(event: any) {
    if (event.keyCode === 13) {
      event.target.blur();
    }
  }

  updateCount(id: string, event: any) {
    const editField = event.target.textContent;
    if (editField === '' || editField === ' ') {
      return;
    } else {
      return;
    }
  }

  newSupply() {
    this.newSup = true;
  }

  unNewSupply() {
    this.newSup = false;
  }

  submitSupply() {
    if (this.newSup) {
      const supply = new Supply();
      supply.SUPPLY_NAME = this.submitForm.controls.incidentSupply.value;
      supply.SUPPLY_UNIT = document.getElementById('newSupplyUnit').textContent;
      supply.SUPPLY_QUANTITY = document.getElementById('newSupply').textContent;
      this.supplies.push(supply);
    }
    this.newSup = false;
    this.updateSupply();
  }

  updateSupply() {
    this.incident.SUPPLIES = this.supplyToString();
    console.log(this.incident.SUPPLIES);
    this.updateIncident.emit(this.incident);
  }

  deleteRow(d) {
    const index = this.supplies.indexOf(d);
    this.supplies.splice(index, 1);
    this.updateSupply();
  }

}
