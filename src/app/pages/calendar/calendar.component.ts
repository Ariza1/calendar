import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventInput, EventAddArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { MatDialog } from '@angular/material/dialog';
import { Empleado } from 'src/app/models/empleados.model';
import { EmpleadosService } from 'src/app/service/empleados.service';
import { EVENTO, INDEX } from 'src/app/common/constants';
import { AddEventoComponent } from '../../components/add-evento/add-evento.component';
import { startOfWeek, isBefore } from 'date-fns';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  calendarOptions = signal<CalendarOptions>({
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      // rrulePlugin,
      // listPlugin
    ],
    headerToolbar: {
      left: '',
      center: 'title',
      right: 'dayGridMonth,week,dayGridDay',
    },
    views: {
      week: {
        type: 'timeGridWeek',
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
    firstDay: 1,
    allDayText: 'Todo el día',
    initialView: 'week',
    initialEvents: [], // alternatively, use the `events` setting to fetch from a feed
    editable: true,
    selectable: true,
    selectMirror: true,
    displayEventTime: true,
    displayEventEnd: true,
    height: 750,
    eventTimeFormat: {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    },
    locale: 'es',
    select: this.addEvent.bind(this),
    eventClick: this.handleEventClick.bind(this),
    // eventsSet: this.handleEvents.bind(this),
    eventAdd: this.saveEvents.bind(this),
    eventChange: this.updateEvents.bind(this),
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  });
  eventos = signal<EventInput[]>([]);
  indice = signal<number>(1);

  constructor(
    private changeDetector: ChangeDetectorRef,
    private dialog: MatDialog,
    private storageService: EmpleadosService
  ) {
  }

  ngOnInit(): void {
    this.inicializarEventos()
    this.inicializarContador()
    this.getFistDayOfWeek()
  }

  inicializarEventos(): void {
    let eventos = this.storageService.read(EVENTO);
    if (eventos) {
      let eventosGuardados: EventInput[] = JSON.parse(eventos);
      let currentEvents = eventosGuardados.filter((evento: EventInput) => !isBefore(new Date(evento.start as string), this.getFistDayOfWeek()));
      currentEvents.forEach((evento: any) => this.eventos.mutate(eventos => eventos.push(evento)));
      this.storageService.update(EVENTO, JSON.stringify(this.eventos()));
    } else {
      this.storageService.create(EVENTO, []);
    }
  }

  inicializarContador(): void {
    let indice = this.storageService.read(INDEX);
    if (indice) {
      this.indice.set(JSON.parse(indice));
    } else {
      this.storageService.create(INDEX, 1);
    }
  }

  addEvent(selectInfo: DateSelectArg) {
    const calendarApi = selectInfo.view.calendar;
    const dialogRef = this.dialog.open(AddEventoComponent, {
      data: {
        fecha: selectInfo
      }
    });
    calendarApi.unselect();
    dialogRef.afterClosed().subscribe((result: Empleado) => {
      if (result) {
        calendarApi.addEvent({
          id: this.indice().toString(),
          title: result.nombre,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          resourceId: result.id
        });
      }
    });
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  getFistDayOfWeek(): Date {
    return startOfWeek(new Date(), { weekStartsOn: 1 });
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
    evento.id = event.event.id;
    this.eventos.mutate(e => e.push(evento));
    this.indice.set(parseInt(event.event.id) + 1);
    this.changeDetector.detectChanges();
    this.storageService.update(INDEX, this.indice().toString());
    this.storageService.update(EVENTO, JSON.stringify(this.eventos()));
  };
}
