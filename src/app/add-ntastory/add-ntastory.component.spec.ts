import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNtastoryComponent } from './add-ntastory.component';

describe('AddNtastoryComponent', () => {
  let component: AddNtastoryComponent;
  let fixture: ComponentFixture<AddNtastoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddNtastoryComponent]
    });
    fixture = TestBed.createComponent(AddNtastoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
