import { differenceInHours, parseISO, startOfWeek } from "date-fns";
import { DiaHorasLaborales, Empleado } from "../models/empleados.model";
import { EventInput } from "@fullcalendar/core";
import { DIAS } from "./constants";

export function getTotalHourPerPerson(eventosGuardados: any[], empleados: any[]) {
  const nombres = getNames([...empleados]);
  let results = convertArrayToObject(nombres);

  return eventosGuardados.reduce((acc: any, curr: any) => {
    acc[curr.title] = acc[curr.title] ? acc[curr.title] + differenceInHours(new Date(curr.end), new Date(curr.start)) : differenceInHours(new Date(curr.end), new Date(curr.start));
    return acc;
  }, results);
}

function getNames(eventos: any[]) {
  return eventos.map((empleado: any) => empleado.nombre);
}

function convertArrayToObject(array: string[]): { [key: string]: any } {
  return array.reduce((obj: { [key: string]: any }, str: string) => {
    obj[str] = 0; // puedes establecer el valor que quieras aquí
    return obj;
  }, {});
}

export function getEmpleadosConTotales(empleados: Empleado[], horasPorPersona: any) {
  return empleados.map((empleado: Empleado) => {
    return {
      ...empleado,
      totalHoras: horasPorPersona[empleado.nombre],
      totalValor: horasPorPersona[empleado.nombre] * empleado.valorHora
    }
  });
}

export function getFistDayOfWeek(): Date {
  return startOfWeek(new Date(), { weekStartsOn: 1 });
}

export function getDiasLaboralesPorPersona(eventos: EventInput[], empleado: string): DiaHorasLaborales[] {
  return eventos
    .filter((evento: EventInput) => evento.title === empleado)
    .map((evento: EventInput) => {
      let inicio = parseISO(evento.start as string)
      let fin = parseISO(evento.end as string)
      return {
        id: inicio.getDay(),
        dia: DIAS[inicio.getDay()],
        start: `${inicio.getHours().toString().padStart(2, '0')}:${inicio.getMinutes().toString().padEnd(2, '0')}`,
        end: `${fin.getHours().toString().padStart(2, '0')}:${fin.getMinutes().toString().padEnd(2, '0')}`,
      }
    })
}

export function verdiasFaltantes(dias: DiaHorasLaborales[]) {
  return DIAS.filter((dia: string) => !dias.some(x => x.dia === dia))
  .map((dia: string) => {
    return {
      id: DIAS.indexOf(dia),
      dia: dia,
      start: '00:00',
      end: '00:00',
    }
  })
}
