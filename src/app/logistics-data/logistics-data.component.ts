import { Component, OnInit } from '@angular/core';
import { LogisticsDataSource } from './logistics.data.source';
import { LogisticsDataService } from './logistics-data.service';
import { Supply } from '../supplies';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-logistics-data',
  templateUrl: './logistics-data.component.html',
  styleUrls: ['./logistics-data.component.css']
})
export class LogisticsDataComponent implements OnInit {

  private dataSource: LogisticsDataSource;
  private hideForm = true;
  private model = new Supply();

  supplyList: Supply[] = [
    {
      _id: '5d3919a26ed54400177e1f1f',
      SUPPLY_NAME: 'Water Bottles',
      SUPPLY_UNIT: 'Cases',
      SUPPLY_QUANTITY: '0'
    },
    {
      _id: '5d3919a26ed54400177e1f1f',
      SUPPLY_NAME: 'Blankets',
      SUPPLY_UNIT: 'Individual',
      SUPPLY_QUANTITY: '0'
    },
    {
      _id: '5d3919a26ed54400177e1f1f',
      SUPPLY_NAME: 'Hand-Warmers',
      SUPPLY_UNIT: 'Cases',
      SUPPLY_QUANTITY: '0'
    },
    {
      _id: '5d3919a26ed54400177e1f1f',
      SUPPLY_NAME: 'Jackets',
      SUPPLY_UNIT: 'Individual',
      SUPPLY_QUANTITY: '0'
    }
  ];

  columnsToDisplay = ['erase', 'supply_name', 'quantity', 'unit', 'add', 'remove'];

  private submitForm = new FormGroup({
    name: new FormControl('', Validators.required),
    quantity: new FormControl('', Validators.required),
    unit: new FormControl('', Validators.required)
  });

  constructor(
    private logisticsService: LogisticsDataService
  ) { }

  ngOnInit() {
    this.dataSource = new LogisticsDataSource(this.logisticsService);
    this.dataSource.loadSupplies();
  }

  clickAdd(supply: Supply) {
    const count = Number(supply.SUPPLY_QUANTITY) + 1;
    supply.SUPPLY_QUANTITY = count.toString();
    this.dataSource.updateSupplies(supply);
  }

  clickRemove(supply: Supply) {
    if (this.validCount(Number(supply.SUPPLY_QUANTITY))) {
      const count = Number(supply.SUPPLY_QUANTITY) - 1;
      supply.SUPPLY_QUANTITY = count.toString();
      this.dataSource.updateSupplies(supply);
    }
  }

  deleteRow(supply: Supply) {
    this.dataSource.deleteSupplies(supply);
  }


  hasError = (controlName: string, errorName: string) => {
    return this.submitForm.controls[controlName].hasError(errorName);
  }

  onClick() {
    this.hideForm = !this.hideForm;
    this.resetForm();
  }

  resetForm() {
    this.submitForm = new FormGroup({
      name: new FormControl('', Validators.required),
      quantity: new FormControl('', Validators.required),
      unit: new FormControl('', Validators.required)
    });
    window.setTimeout( () => {
      document.getElementById('name').focus();
    }, 0);
  }

  onSubmitSupply() {
    this.model.SUPPLY_NAME = this.submitForm.controls.name.value;
    this.model.SUPPLY_QUANTITY = this.submitForm.controls.quantity.value;
    this.model.SUPPLY_UNIT = this.submitForm.controls.unit.value;
    this.dataSource.addSupply(this.model);
    this.model = new Supply();
    this.onClick();
  }

  validCount(count: number) {
    if (count <= 0) {
      return false;
    } else {
      return true;
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter(filterValue.trim().toLowerCase());
  }

  sortName() {
    this.dataSource.sortName();
  }

  sortQuantity() {
    this.dataSource.sortLocation();
  }

  sortUnit() {
    this.dataSource.sortStatus();
  }
}
