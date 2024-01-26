import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { CargoComponent } from './pages/cargo/cargo.component';
import { EmpleadoComponent } from './pages/empleado/empleado.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: 'home', component: CalendarComponent},
  {path: 'cargos', component: CargoComponent},
  {path: 'empleados', component: EmpleadoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
