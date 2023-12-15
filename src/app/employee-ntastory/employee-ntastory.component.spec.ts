import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeNtastoryComponent } from './employee-ntastory.component';

describe('EmployeeNtastoryComponent', () => {
  let component: EmployeeNtastoryComponent;
  let fixture: ComponentFixture<EmployeeNtastoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeNtastoryComponent]
    });
    fixture = TestBed.createComponent(EmployeeNtastoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
