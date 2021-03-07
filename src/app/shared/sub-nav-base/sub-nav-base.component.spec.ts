import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubNavBaseComponent } from './sub-nav-base.component';

describe('SubNavBaseComponent', () => {
  let component: SubNavBaseComponent;
  let fixture: ComponentFixture<SubNavBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubNavBaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubNavBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
