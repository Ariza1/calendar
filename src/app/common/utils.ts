import { differenceInHours } from "date-fns";
import { Empleado } from "../models/empleados.model";

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
