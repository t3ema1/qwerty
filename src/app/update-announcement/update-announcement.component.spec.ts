import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAnnouncementComponent } from './update-announcement.component';

describe('UpdateAnnouncementComponent', () => {
  let component: UpdateAnnouncementComponent;
  let fixture: ComponentFixture<UpdateAnnouncementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateAnnouncementComponent]
    });
    fixture = TestBed.createComponent(UpdateAnnouncementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
