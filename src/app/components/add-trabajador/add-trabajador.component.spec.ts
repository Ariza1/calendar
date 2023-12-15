import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTrabajadorComponent } from './add-trabajador.component';

describe('AddTrabajadorComponent', () => {
  let component: AddTrabajadorComponent;
  let fixture: ComponentFixture<AddTrabajadorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddTrabajadorComponent]
    });
    fixture = TestBed.createComponent(AddTrabajadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
