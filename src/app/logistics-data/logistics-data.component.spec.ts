import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogisticsDataComponent } from './logistics-data.component';

describe('LogisticsDataComponent', () => {
  let component: LogisticsDataComponent;
  let fixture: ComponentFixture<LogisticsDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogisticsDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogisticsDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
