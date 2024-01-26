import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EMPLEADO } from 'src/app/common/constants';
import { MaterialModule } from 'src/app/material.module';
import { Empleado } from 'src/app/models/empleados.model';
import { EmpleadosService } from 'src/app/service/empleados.service';

@Component({
  selector: 'app-add-evento',
  templateUrl: './add-evento.component.html',
  styleUrls: ['./add-evento.component.scss'],
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, CommonModule]
})
export class AddEventoComponent implements OnInit{
  formEvento: FormGroup;
  empleados = signal<Empleado[]>([]);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddEventoComponent>,
    private storageService: EmpleadosService
  ) {
    this.formEvento = this.fb.group({
      empleado: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.inicializarEmpleados();
  }

  getHora(fecha: string): string {
    return `${(new Date(fecha).getHours()).toString().padStart(2, '0')}:${(new Date(fecha).getMinutes()).toString().padEnd(2, '0')}`
  }

  getDate(fecha: string): string {
    return `${new Date(fecha).getDate()}`
  }

  inicializarEmpleados(): void {
    let empleados = this.storageService.read(EMPLEADO);
    if (empleados) {
      let empleadosGuardados = JSON.parse(empleados);
      empleadosGuardados.forEach((empleado: Empleado) => {
        this.empleados.mutate(empleados => empleados.push(empleado))
      });
    } else {
      this.storageService.create(EMPLEADO, []);
    }
  }

  guardarEvento(): void {
    if (this.formEvento.invalid) return;
    const { empleado } = this.formEvento.value;
    const empleadoSelected = [...this.empleados()].filter((e: Empleado) => e.id === empleado)[0];
    this.dialogRef.close(empleadoSelected);
  }

}
