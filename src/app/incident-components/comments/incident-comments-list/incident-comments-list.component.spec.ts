import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentCommentsListComponent } from './incident-comments-list.component';

describe('IncidentCommentsListComponent', () => {
  let component: IncidentCommentsListComponent;
  let fixture: ComponentFixture<IncidentCommentsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncidentCommentsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentCommentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
