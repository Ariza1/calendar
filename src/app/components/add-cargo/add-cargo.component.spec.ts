import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCargoComponent } from './add-cargo.component';

describe('AddCargoComponent', () => {
  let component: AddCargoComponent;
  let fixture: ComponentFixture<AddCargoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCargoComponent]
    });
    fixture = TestBed.createComponent(AddCargoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
