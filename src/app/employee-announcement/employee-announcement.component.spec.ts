import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAnnouncementComponent } from './employee-announcement.component';

describe('EmployeeAnnouncementComponent', () => {
  let component: EmployeeAnnouncementComponent;
  let fixture: ComponentFixture<EmployeeAnnouncementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeAnnouncementComponent]
    });
    fixture = TestBed.createComponent(EmployeeAnnouncementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
