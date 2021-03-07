import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundRobinTableComponent } from './round-robin-table.component';

describe('RoundRobinTableComponent', () => {
  let component: RoundRobinTableComponent;
  let fixture: ComponentFixture<RoundRobinTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoundRobinTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundRobinTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
