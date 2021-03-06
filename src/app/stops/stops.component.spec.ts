import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StopsComponent } from './stops.component';

describe('StopsListComponent', () => {
  let component: StopsComponent;
  let fixture: ComponentFixture<StopsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StopsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
