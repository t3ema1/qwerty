import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrAnnouncementComponent } from './hr-announcement.component';

describe('HrAnnouncementComponent', () => {
  let component: HrAnnouncementComponent;
  let fixture: ComponentFixture<HrAnnouncementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HrAnnouncementComponent]
    });
    fixture = TestBed.createComponent(HrAnnouncementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
