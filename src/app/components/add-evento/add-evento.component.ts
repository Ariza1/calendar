import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-add-evento',
  templateUrl: './add-evento.component.html',
  styleUrls: ['./add-evento.component.scss'],
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, CommonModule]
})
export class AddEventoComponent{
  formEvento: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.formEvento = this.fb.group({
      empleado: ['', [Validators.required]],
    });
  }

  getHora(fecha: string): string {
    return `${(new Date(fecha).getHours()).toString().padStart(2, '0')}:${(new Date(fecha).getMinutes()).toString().padEnd(2, '0')}`
  }
  getDate(fecha: string): string {
    return `${new Date(fecha).getDate()}`
  }

}
