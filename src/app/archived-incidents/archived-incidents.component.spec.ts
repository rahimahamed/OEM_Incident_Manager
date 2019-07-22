import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedIncidentsComponent } from './archived-incidents.component';

describe('ArchivedIncidentsComponent', () => {
  let component: ArchivedIncidentsComponent;
  let fixture: ComponentFixture<ArchivedIncidentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchivedIncidentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivedIncidentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
