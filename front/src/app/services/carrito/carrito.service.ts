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
  private readonly CARRITO_KEY = 'cart';

  carrito$ = this.carritoSubject.asObservable();

  constructor() {
    this.cargarCarritoInicial();
  }

  private cargarCarritoInicial(): void {
    try {
      const carritoData = localStorage.getItem(this.CARRITO_KEY);
      if (carritoData) {
        this.carrito = JSON.parse(carritoData);
        this.carritoSubject.next(this.carrito);
      }
    } catch (error) {
      console.error('Error al cargar el carrito:', error);
      this.limpiarCarrito();
    }
  }

  private guardarEnLocalStorage(): void {
    localStorage.setItem(this.CARRITO_KEY, JSON.stringify(this.carrito));
  }

  agregarProducto(producto: CarritoItem): void {
    try {
      const cartData = localStorage.getItem("cart");
      this.carrito = cartData ? JSON.parse(cartData) : [];
      
      const itemIndex = this.carrito.findIndex(p => p.id === producto.id);
      
      if (itemIndex > -1) {
        this.carrito[itemIndex].cantidad += producto.cantidad;
      } else {
        this.carrito.push({ ...producto });
      }
      
      this.carritoSubject.next([...this.carrito]);
      localStorage.setItem("cart", JSON.stringify(this.carrito));
      
    } catch (error) {
      console.error('Error al actualizar el carrito:', error);
      this.carrito = [];
      localStorage.setItem("cart", JSON.stringify([]));
    }
  }

  eliminarProducto(id: number): void {
    this.carrito = this.carrito.filter(p => p.id !== id);
    this.actualizarEstado();
  }

  actualizarCantidad(id: number, nuevaCantidad: number): void {
    const item = this.carrito.find(p => p.id === id);
    if (item) {
      item.cantidad = nuevaCantidad;
      this.actualizarEstado();
    }
  }

  limpiarCarrito(): void {
    this.carrito = [];
    this.actualizarEstado();
  }

  obtenerTotal(): number {
    return this.carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);
  }

  obtenerCarrito(): CarritoItem[] {
    return [...this.carrito];
  }

  private actualizarEstado(): void {
    this.carritoSubject.next([...this.carrito]);
    this.guardarEnLocalStorage();
  }
}