import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganisatorFormComponent } from './organisator-form.component';

describe('OrganisatorFormComponent', () => {
  let component: OrganisatorFormComponent;
  let fixture: ComponentFixture<OrganisatorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganisatorFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganisatorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
