import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  create(name: string) {
    localStorage.setItem(name, '');
  }

  read(name: string) {
    return localStorage.getItem(name);
  }

  update(name: string, data: string) {
    localStorage.setItem(name, data);
  }

  delete(name: string) {
    localStorage.removeItem(name);
  }
}
