import { Component, signal, ChangeDetectorRef, OnInit } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { INITIAL_EVENTS, createEventId } from './event-utils';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { MatDialog } from '@angular/material/dialog';
import { AddTrabajadorComponent } from './components/add-trabajador/add-trabajador.component';
import { Empleado } from './models/empleados.model';
import { EmpleadosService } from './service/empleados.service';
import { EMPLEADO } from './common/constants';
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
        slotMinTime: '00:00:00',
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
    initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed

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
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this)
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  });
  currentEvents = signal<EventApi[]>([]);
  empleados = signal<Empleado[]>([]);

  constructor(
    private changeDetector: ChangeDetectorRef,
    private dialog: MatDialog,
    private empleadoService: EmpleadosService
  ) {
  }

  ngOnInit(): void {
    this.inicializarEmpleados()
  }

  inicializarEmpleados(): void {
    let empleados = this.empleadoService.read(EMPLEADO);
    if (empleados) {
      let empleadosGuardados = JSON.parse(empleados);
      empleadosGuardados.forEach((empleado: Empleado) => {
        this.empleados.mutate(empleados => empleados.push(empleado))
      });
    } else {
      this.empleadoService.create(EMPLEADO);
    }

  }
  // muestra o no los fines de semana
  // handleWeekendsToggle() {
  //   this.calendarOptions.mutate((options) => {
  //     options.weekends = !options.weekends;
  //   });
  // }

  handleDateSelect(selectInfo: DateSelectArg) {
    const dialogRef = this.dialog.open(AddEventoComponent, {
      data: {
        empleados: this.empleados(),
        fecha:selectInfo
      }
    });
    const title = 'hola' //  prompt('Please enter a new title for your event ' + new Date(selectInfo.startStr).getHours() + ':' + new Date(selectInfo.startStr).getMinutes());
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection
    console.log(selectInfo)
    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        display: 'block',
        borderColor: 'red',
        backgroundColor: 'red',
        // allDay: selectInfo.allDay
      });
    }
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
      this.empleadoService.update(EMPLEADO, JSON.stringify(this.empleados()));
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
}
