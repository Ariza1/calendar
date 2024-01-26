import { Component, OnInit, signal } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EmpleadosService } from 'src/app/service/empleados.service';
import { MatDialog } from '@angular/material/dialog';
import { CARGO } from 'src/app/common/constants';
import { Cargo } from 'src/app/models/empleados.model';
import { MaterialModule } from 'src/app/material.module';
import { AddCargoComponent } from 'src/app/components/add-cargo/add-cargo.component';
import { v4 as uuidv4 } from 'uuid';
import { TableComponent } from 'src/app/components/table/table.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cargo',
  templateUrl: './cargo.component.html',
  styleUrls: ['./cargo.component.scss'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MaterialModule, TableComponent, CommonModule],
})
export class CargoComponent implements OnInit {

  cargos = signal<Cargo[]>([]);
  showTable: boolean = true;
  columnsCargo: string[] = ['nombre', 'valorHora', 'id'];

  constructor(
    private dialog: MatDialog,
    private storageService: EmpleadosService
  ) {
  }

  ngOnInit(): void {
    this.inicializarCargo();
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

  addAndEditCargo(cargo?: Cargo): void {
    const dialogRef = this.dialog.open(AddCargoComponent, {
      data: {
        cargo: cargo,
        title: cargo ? 'Editar cargo' : 'Agregar cargo'
      }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (!result) return;
      this.showTable = false;
      const cargoDto: Cargo = {
        id: cargo ? cargo.id : uuidv4(),
        nombre: result.nombre,
        valorHora: result.valorHora
      }
      if (cargo) {
        this.cargos.mutate(car => {
          const index = car.findIndex(c => c.id === cargoDto.id);
          car[index] = cargoDto;
        })
      } else {
        this.cargos.mutate(car => car.push(cargoDto))
      }
      this.loadTable();
    });
  }

  eliminarCargo($event: Cargo) {
    this.showTable = false;
    const cargos = [...this.cargos()];
    this.cargos.set(cargos.filter(c => c.id !== $event.id));
    this.loadTable();
  }

  private loadTable() {
    setTimeout(() => this.showTable = true, 200);
    this.storageService.update(CARGO, JSON.stringify(this.cargos()));
  }
}

