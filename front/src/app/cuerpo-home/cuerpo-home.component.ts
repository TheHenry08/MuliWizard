import {
  Component,
  inject,
  ElementRef,
  AfterViewInit,
  ViewChild,
  Renderer2
} from '@angular/core';
import { ProductosService } from '../services/productos/productos.service';
import { CarritoService } from '../services/carrito/carrito.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
declare var bootstrap: any;

@Component({
  selector: 'app-cuerpo-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cuerpo-home.component.html',
  styleUrl: './cuerpo-home.component.css',
})
export class CuerpoHomeComponent {
  private productosService = inject(ProductosService);
  terminoActual = '';
  productos: any[] = [];

  constructor(private router: Router, public carritoService: CarritoService) {
    this.productosService.getProductos().subscribe((data) => {
      this.productos = data;
    });
  }

  redirigirDetalle(producto: any) {
    this.router.navigate(['/detalle', producto.id]);
  }

  agregarAlCarrito(producto: any) {
    console.log(producto);
    this.carritoService.agregarProducto({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad: 1 
    });
    console.log(this.carritoService);
  }
}
