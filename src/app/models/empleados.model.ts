export interface FormEmpleado {
  id: string;
  nombre: string;
  cargo: Cargo;
}

export interface Empleado extends Omit<FormEmpleado, 'cargo'>{
  valorHora: number;
  nombreCargo: string;
  idCargo: string;
  totalHoras: number;
  totalValor: number;
}
export interface Evento {
  id: string;
  nombre: string;
  color: string;
}

export interface Cargo {
  id: string;
  nombre: string;
  valorHora: number;
}

export interface CargoDialogData {
  cargo: Cargo;
  title: string;
}
export interface EmpleadoDialogData {
  empleado: Empleado;
  title: string;
}
