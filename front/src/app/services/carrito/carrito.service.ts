import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CarritoItem {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
}

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carrito: CarritoItem[] = [];
  private carritoSubject = new BehaviorSubject<CarritoItem[]>([]);

  carrito$ = this.carritoSubject.asObservable();

  agregarProducto(producto: CarritoItem) {
    const item = this.carrito.find(p => p.id === producto.id);
    if (item) {
      item.cantidad += producto.cantidad;
    } else {
      this.carrito.push({ ...producto });
    }
    this.carritoSubject.next(this.carrito);
  }

  eliminarProducto(id: number) {
    this.carrito = this.carrito.filter(p => p.id !== id);
    this.carritoSubject.next(this.carrito);
  }

  limpiarCarrito() {
    this.carrito = [];
    this.carritoSubject.next(this.carrito);
  }

  obtenerTotal(): number {
    return this.carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);
  }

  obtenerCarrito(): CarritoItem[] {
    return [...this.carrito];
  }
}
