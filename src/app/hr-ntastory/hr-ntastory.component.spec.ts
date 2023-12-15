import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrNtastoryComponent } from './hr-ntastory.component';

describe('HrNtastoryComponent', () => {
  let component: HrNtastoryComponent;
  let fixture: ComponentFixture<HrNtastoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HrNtastoryComponent]
    });
    fixture = TestBed.createComponent(HrNtastoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
