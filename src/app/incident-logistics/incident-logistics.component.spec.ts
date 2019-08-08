import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentLogisticsComponent } from './incident-logistics.component';

describe('IncidentLogisticsComponent', () => {
  let component: IncidentLogisticsComponent;
  let fixture: ComponentFixture<IncidentLogisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncidentLogisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentLogisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
