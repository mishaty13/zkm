import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeparturesAtStopComponent } from './departures-at-stop.component';

describe('DeparturesAtStopComponent', () => {
  let component: DeparturesAtStopComponent;
  let fixture: ComponentFixture<DeparturesAtStopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeparturesAtStopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeparturesAtStopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
