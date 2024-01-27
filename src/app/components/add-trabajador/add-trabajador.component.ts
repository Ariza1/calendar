import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CARGO } from 'src/app/common/constants';
import { MaterialModule } from 'src/app/material.module';
import { Cargo, EmpleadoDialogData, FormEmpleado } from 'src/app/models/empleados.model';
import { EmpleadosService } from 'src/app/service/empleados.service';

@Component({
  selector: 'app-add-trabajador',
  templateUrl: './add-trabajador.component.html',
  styleUrls: ['./add-trabajador.component.scss'],
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, CommonModule]
})
export class AddTrabajadorComponent implements OnInit {
  formEmpleado: FormGroup;
  cargos = signal<Cargo[]>([]);
  fb = inject(FormBuilder);
  storageService = inject(EmpleadosService);

  constructor(
    public dialogRef: MatDialogRef<AddTrabajadorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EmpleadoDialogData
  ) {
    this.formEmpleado = this.fb.group({
      nombre: ['', [Validators.required]],
      cargo: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.inicializarCargo();
    if (this.data.empleado) {
      this.formEmpleado.patchValue({
        nombre: this.data.empleado.nombre,
        cargo: this.data.empleado.idCargo
      });
    }
  }

  inicializarCargo(): void {
    let cargos = this.storageService.read(CARGO);
    if (cargos) {
      let cargosGuardados = JSON.parse(cargos);
      cargosGuardados.forEach((cargo: Cargo) => {
        this.cargos.mutate(cargos => cargos.push(cargo))
      });
    } else {
      this.storageService.create(CARGO, []);
    }
  }

  actualizarEmpleado(): void {
    if (this.formEmpleado.invalid) return;
    const { nombre, cargo } = this.formEmpleado.value;
    const cargoSelected = [...this.cargos()].filter((c: Cargo) => c.id === cargo)[0];
    let empleado: FormEmpleado = {
      id: this.data.empleado ? this.data.empleado.id : '',
      nombre,
      cargo: cargoSelected
    }
    this.dialogRef.close(empleado);
  }

}
