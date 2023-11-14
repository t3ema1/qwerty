import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HumanResComponent } from './human-res.component';

describe('HumanResComponent', () => {
  let component: HumanResComponent;
  let fixture: ComponentFixture<HumanResComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HumanResComponent]
    });
    fixture = TestBed.createComponent(HumanResComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
