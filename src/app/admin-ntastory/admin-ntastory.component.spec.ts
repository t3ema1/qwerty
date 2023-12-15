import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNtastoryComponent } from './admin-ntastory.component';

describe('AdminNtastoryComponent', () => {
  let component: AdminNtastoryComponent;
  let fixture: ComponentFixture<AdminNtastoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminNtastoryComponent]
    });
    fixture = TestBed.createComponent(AdminNtastoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
