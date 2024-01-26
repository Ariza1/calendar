import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { EMPLEADO } from 'src/app/common/constants';
import { AddTrabajadorComponent } from 'src/app/components/add-trabajador/add-trabajador.component';
import { TableComponent } from 'src/app/components/table/table.component';
import { MaterialModule } from 'src/app/material.module';
import { Empleado, FormEmpleado } from 'src/app/models/empleados.model';
import { EmpleadosService } from 'src/app/service/empleados.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.scss'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MaterialModule, TableComponent, CommonModule],
})
export class EmpleadoComponent implements OnInit{

  showTable: boolean = true;
  empleados = signal<Empleado[]>([]);
  columnsCargo: string[] = ['nombre', 'nombreCargo', 'valorHora', 'id'];
  constructor(
    private dialog: MatDialog,
    private storageService: EmpleadosService
  ) {
  }

  ngOnInit(): void {
   this.inicializarEmpleados();
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

  addAndEditEmpleado(empleado?: Empleado): void {
    const dialogRef = this.dialog.open(AddTrabajadorComponent, {
      data: {
        empleado: empleado,
        title: empleado ? 'Editar empleado' : 'Agregar empleado'
      }
    });

    dialogRef.afterClosed().subscribe((result: FormEmpleado) => {
      if (!result) return;
      this.showTable = false;
      const empleadoDto: Empleado = {
        id: empleado ? empleado.id : uuidv4(),
        nombre: result.nombre,
        nombreCargo: result.cargo.nombre,
        idCargo: result.cargo.id,
        valorHora: result.cargo.valorHora
      }
      if (empleado) {
        this.empleados.mutate(car => {
          const index = car.findIndex(c => c.id === empleadoDto.id);
          car[index] = empleadoDto;
        })
      } else {
        this.empleados.mutate(car => car.push(empleadoDto))
      }
      this.loadTable();
    });
  }

  eliminarEmpleado($event: Empleado) {
    this.showTable = false;
    const empleadosArray = [...this.empleados()];
    this.empleados.set(empleadosArray.filter(c => c.id !== $event.id));
    this.loadTable();
  }

  private loadTable() {
    setTimeout(() => this.showTable = true, 200);
    this.storageService.update(EMPLEADO, JSON.stringify(this.empleados()));
  }

}
