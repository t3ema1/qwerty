import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateNtastoryComponent } from './update-ntastory.component';

describe('UpdateNtastoryComponent', () => {
  let component: UpdateNtastoryComponent;
  let fixture: ComponentFixture<UpdateNtastoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateNtastoryComponent]
    });
    fixture = TestBed.createComponent(UpdateNtastoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
