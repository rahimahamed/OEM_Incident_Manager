import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Incident } from '../incident';
import { Supply } from '../supplies';
import { FormGroup, FormControl } from '@angular/forms';
import { LogisticsDataService } from '../logistics-data/logistics-data.service';

@Component({
  selector: 'app-incident-logistics',
  templateUrl: './incident-logistics.component.html',
  styleUrls: ['./incident-logistics.component.css']
})
export class IncidentLogisticsComponent implements OnInit {
  @Input() incident: Incident;
  supplyList: Supply[];
  @Output() updateIncident = new EventEmitter();
  supplies: Supply[] = [];
  newSup = false;
  selected = 'Jackets';

  private submitForm = new FormGroup({
    incidentSupply: new FormControl(''),
  });


  constructor(
    private logisticsService: LogisticsDataService,
  ) {}

  ngOnInit() {
    this.logisticsService.getSupplies().subscribe(
      (resSup: Supply[]) => {
        this.supplyList = resSup;
      }
    );
    if (this.incident.SUPPLIES) {
      this.stringToSupply(this.incident.SUPPLIES);
    }
  }

  remaining(name: string) {
    if (name === 'selected') {
      const supply = this.supplyList.find((s: Supply) =>
      s.SUPPLY_NAME === this.selected);
      if (supply) { return supply.SUPPLY_QUANTITY; }
      return '0';
    } else {
      const supply = this.supplyList.find((s: Supply) =>
      s.SUPPLY_NAME === name);
      if (supply) { return supply.SUPPLY_QUANTITY; }
      return '0';
    }
  }

  stringToSupply(supplyString: string) {
    const initSplit: string[] = supplyString.split('%');
    for (const supply of initSplit) {
      const split = supply.split('*');
      const supplyToPush = new Supply();
      supplyToPush.SUPPLY_NAME = split[0];
      supplyToPush.SUPPLY_UNIT = split[1];
      supplyToPush.SUPPLY_QUANTITY = split[2];
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
    const supply = this.supplyList.find((supply: Supply) =>
      supply.SUPPLY_NAME === this.selected);
    if (supply) {
      return supply.SUPPLY_UNIT;
    }
    return '0';
  }

  containsSupply(supply: Supply) {
    for (const sup of this.supplies) {
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
    this.updateLogistics(false, this.supplies[index], index);
    this.updateSupply();
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
      this.updateLogistics(true, this.supplies[index], index);
      this.updateSupply();
    }
  }

  updateLogistics(plus: boolean, sup: Supply, index) {
    if (plus) {
      const supply = this.supplyList.find((s: Supply) =>
        s.SUPPLY_NAME === sup.SUPPLY_NAME);
      if (supply) {
        supply.SUPPLY_QUANTITY = (Number(supply.SUPPLY_QUANTITY) + 1).toString();
        this.logisticsService.updateSupplies(supply).subscribe(
          newSupply => {

          }
        );
      }
    } else {
      const supply = this.supplyList.find((s: Supply) =>
        s.SUPPLY_NAME === sup.SUPPLY_NAME);
      if (supply) {
        const count = (Number(supply.SUPPLY_QUANTITY) - 1);
        if (count >= 0) {
          const ogCount = Number(sup.SUPPLY_QUANTITY) + 1;
          this.supplies[index].SUPPLY_QUANTITY = ogCount.toString();
          supply.SUPPLY_QUANTITY = count.toString();
          this.logisticsService.updateSupplies(supply).subscribe(
            newSupply => {

            }
          );
        }
      }
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
      if (supply.SUPPLY_QUANTITY === '0') {
        return;
      }
      this.supplies.push(supply);
      const sup = this.supplyList.find((s: Supply) =>
        s.SUPPLY_NAME === supply.SUPPLY_NAME);
      if (sup) {
        sup.SUPPLY_QUANTITY = (Number(sup.SUPPLY_QUANTITY) - Number(supply.SUPPLY_QUANTITY)).toString();
        this.logisticsService.updateSupplies(sup).subscribe(
          newSupply => {
          }
        );
      }
    }
    this.newSup = false;
    this.updateSupply();
  }

  updateSupply() {
    this.incident.SUPPLIES = this.supplyToString();
    this.updateIncident.emit(this.incident);
  }

  deleteRow(d) {
    const index = this.supplies.indexOf(d);
    const temp = this.supplies[index];
    this.supplies.splice(index, 1);
    this.updateSupply();
    const sup = this.supplyList.find((s: Supply) =>
      s.SUPPLY_NAME === temp.SUPPLY_NAME);
    if (sup) {
      sup.SUPPLY_QUANTITY = (Number(sup.SUPPLY_QUANTITY) + Number(temp.SUPPLY_QUANTITY)).toString();
      this.logisticsService.updateSupplies(sup).subscribe(
        newSupply => {
        }
      );
    }
  }

}
