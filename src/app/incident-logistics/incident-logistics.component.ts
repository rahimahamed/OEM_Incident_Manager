import { Component, OnInit, Input } from '@angular/core';
import { Incident } from '../incident';
import { Supply } from '../supplies';

@Component({
  selector: 'app-incident-logistics',
  templateUrl: './incident-logistics.component.html',
  styleUrls: ['./incident-logistics.component.css']
})
export class IncidentLogisticsComponent implements OnInit {
  @Input() incident: Incident;
  supplies: Supply[] = [];
  newSup = false;
  selected = 'Jackets';
  supplyList: Supply[] = [
    {
      SUPPLY_NAME: 'Water Bottles',
      SUPPLY_UNIT: 'Cases',
      SUPPLY_QUANTITY: '0'
    },
    {
      SUPPLY_NAME: 'Blankets',
      SUPPLY_UNIT: 'Individual',
      SUPPLY_QUANTITY: '0'
    },
    {
      SUPPLY_NAME: 'Hand-Warmers',
      SUPPLY_UNIT: 'Cases',
      SUPPLY_QUANTITY: '0'
    },
    {
      SUPPLY_NAME: 'Jackets',
      SUPPLY_UNIT: 'Individual',
      SUPPLY_QUANTITY: '0'
    }
  ];

  constructor() { }

  ngOnInit() {
    if (this.incident.SUPPLIES) {
      this.stringToSupply(this.incident.SUPPLIES);
    }
  }

  stringToSupply(supplyString: string) {
    console.log(supplyString);
    const initSplit: string[] = supplyString.split(',');
    for (const supply of initSplit) {
      const split = supply.split('-');
      const supplyToPush = new Supply();
      supplyToPush.SUPPLY_NAME = split[0];
      supplyToPush.SUPPLY_UNIT = split[1];
      supplyToPush.SUPPLY_QUANTITY = split[2];
      console.log(supplyToPush);
      this.supplies.push(supplyToPush);
    }
  }

  supplyToString(supply: Supply) {
    const supplyString = '';
    return supplyString;
  }

  returnUnit() {
    return this.supplyList.find((supply: Supply) =>
            supply.SUPPLY_NAME === this.selected).SUPPLY_UNIT;
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

  newSupply() {
    this.newSup = true;
  }

  unNewSupply() {
    this.newSup = false;
  }

  submitSupply() {
    this.newSup = false;
  }

  deleteRow(d) {
    const index = this.supplies.indexOf(d);
    this.supplies.splice(index, 1);
  }

}
