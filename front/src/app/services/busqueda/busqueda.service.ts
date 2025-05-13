import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BusquedaService {
  private terminoBusqueda = new BehaviorSubject<string>('');
  terminoBusqueda$ = this.terminoBusqueda.asObservable();

  actualizarBusqueda(termino: string) {
    this.terminoBusqueda.next(termino);
  }

}
