import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-add-trabajador',
  templateUrl: './add-trabajador.component.html',
  styleUrls: ['./add-trabajador.component.scss'],
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, CommonModule]
})
export class AddTrabajadorComponent {
  formEmpleado: FormGroup;

  fb = inject(FormBuilder);

  constructor() {
    this.formEmpleado = this.fb.group({
      nombre: [''],
      color: ['']
    });
  }

}
