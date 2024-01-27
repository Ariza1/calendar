import { Component, Inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { DiaHorasLaborales, EmpleadoBottomSheetData } from 'src/app/models/empleados.model';
import { EmpleadosService } from 'src/app/service/empleados.service';
import { EventInput } from '@fullcalendar/core';
import { getDiasLaboralesPorPersona, verdiasFaltantes } from 'src/app/common/utils';
import { EVENTO } from 'src/app/common/constants';

@Component({
  selector: 'app-ver-empleado',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ver-empleado.component.html',
  styleUrls: ['./ver-empleado.component.scss']
})
export class VerEmpleadoComponent implements OnInit {
  dias = signal<DiaHorasLaborales[]>([]);

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: EmpleadoBottomSheetData,
    private storageService: EmpleadosService
  ) { }

  ngOnInit(): void {
    this.inicializarEventos(this.data.empleado.nombre);
  }

  inicializarEventos(nombre: string): void {
    let eventos = this.storageService.read(EVENTO);
    if (eventos) {
      let eventosGuardados: EventInput[] = JSON.parse(eventos);
      let result: DiaHorasLaborales[] = getDiasLaboralesPorPersona(eventosGuardados, nombre)
      verdiasFaltantes(result)
        .forEach((dia: DiaHorasLaborales) => result.push(dia))
     this.dias.set(result.sort((a, b) => a.id - b.id));
    }
  }

}
