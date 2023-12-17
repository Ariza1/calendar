import { Component, signal, ChangeDetectorRef, OnInit } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi, EventInput, EventAddArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { createEventId } from './event-utils';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { MatDialog } from '@angular/material/dialog';
import { AddTrabajadorComponent } from './components/add-trabajador/add-trabajador.component';
import { Empleado } from './models/empleados.model';
import { EmpleadosService } from './service/empleados.service';
import { EMPLEADO, EVENTO } from './common/constants';
import { v4 as uuidv4 } from 'uuid';
import { AddEventoComponent } from './components/add-evento/add-evento.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  calendarOptions = signal<CalendarOptions>({
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      // rrulePlugin,
      // listPlugin
    ],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,week,dayGridDay',
    },
    views: {
      week: {
        type: 'timeGridWeek',
        duration: { days: 7 },
        buttonText: 'Semana',
        slotMaxTime: '22:00:00',
        slotMinTime: '06:00:00',
        timeHint: '03:00:00',
        slotLabelFormat: {
          hour: 'numeric',
          minute: '2-digit',
          hour12: false
        },
        allDaySlot: false,
        nowIndicator: true,
      }
    },
    allDayText: 'Todo el día',
    initialView: 'week',
    initialEvents: [], // alternatively, use the `events` setting to fetch from a feed
    editable: true,
    selectable: true,
    selectMirror: true,
    displayEventTime: true,
    displayEventEnd: true,
    height: 650,
    eventTimeFormat: {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    },
    locale: 'es',
    select: this.addEvent.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    eventAdd: this.saveEvents.bind(this),
    eventChange: this.updateEvents.bind(this),
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  });
  currentEvents = signal<EventApi[]>([]);
  empleados = signal<Empleado[]>([]);
  eventos = signal<EventInput[]>([]);


  constructor(
    private changeDetector: ChangeDetectorRef,
    private dialog: MatDialog,
    private storageService: EmpleadosService
  ) {
  }

  ngOnInit(): void {
    this.inicializarEmpleados()
    this.inicializarEventos()
  }

  inicializarEmpleados(): void {
    let empleados = this.storageService.read(EMPLEADO);
    if (empleados) {
      let empleadosGuardados = JSON.parse(empleados);
      empleadosGuardados.forEach((empleado: Empleado) => {
        this.empleados.mutate(empleados => empleados.push(empleado))
      });
    } else {
      this.storageService.create(EMPLEADO);
    }
  }

  inicializarEventos(): void {
    let eventos = this.storageService.read(EVENTO);
    if (eventos) {
      let eventosGuardados = JSON.parse(eventos);
      eventosGuardados.forEach((evento: any) => {
        this.eventos.mutate(eventos => eventos.push(
          evento
        ))
      });
    } else {
      this.storageService.create(EVENTO);
    }
  }
  // muestra o no los fines de semana
  // handleWeekendsToggle() {
  //   this.calendarOptions.mutate((options) => {
  //     options.weekends = !options.weekends;
  //   });
  // }

  addEvent(selectInfo: DateSelectArg) {
    const calendarApi = selectInfo.view.calendar;
    const dialogRef = this.dialog.open(AddEventoComponent, {
      data: {
        empleados: this.empleados(),
        fecha: selectInfo
      }
    });
    calendarApi.unselect();
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        let empleado: Empleado = this.filtrarEmpleado(this.empleados(), result.empleado);
        calendarApi.addEvent({
          id: createEventId(),
          title: empleado.nombre,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          backgroundColor: empleado.color,
          resourceId: empleado.id
        });
      }
    });
  }

  filtrarEmpleado(empleados: Empleado[], id: string): Empleado {
    return empleados.filter((empleado: Empleado) => empleado.id === id)[0];
  }

  addEmpleado(): void {
    const dialogRef = this.dialog.open(AddTrabajadorComponent);

    dialogRef.afterClosed().subscribe((result: any) => {
      const empleado: Empleado= {
        id: uuidv4(),
        nombre: result.nombre,
        color: result.color
      }
      result.id = uuidv4();
      this.empleados.mutate(empleados => empleados.push(empleado))
      this.storageService.update(EMPLEADO, JSON.stringify(this.empleados()));
    });
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents.set(events);
    this.changeDetector.detectChanges(); // workaround for pressionChangedAfterItHasBeenCheckedError
  }

  updateEvents(event: EventAddArg) {
    this.eventos.mutate(e => {
      e.forEach((evento: EventInput) => {
        if (evento.id === event.event.id) {
          evento.start = event.event.startStr;
          evento.end = event.event.endStr;
        }
      })
    });
    this.changeDetector.detectChanges();
    this.storageService.update(EVENTO, JSON.stringify(this.eventos()));
  }
  saveEvents(event: EventAddArg) {
    let evento: EventInput = {} as EventInput;
    evento.title = event.event.title;
    evento.start = event.event.startStr;
    evento.end = event.event.endStr;
    evento.backgroundColor = event.event.backgroundColor;
    evento.id = event.event.id;
    this.eventos.mutate(e=> e.push(evento));
    this.changeDetector.detectChanges();
    this.storageService.update(EVENTO, JSON.stringify(this.eventos()));
  };
}
