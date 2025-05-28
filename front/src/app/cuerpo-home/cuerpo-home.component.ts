import {
  Component,
  inject,
  ElementRef,
  AfterViewInit,
  ViewChild,
  Renderer2,
} from '@angular/core';
import { ProductosService } from '../services/productos/productos.service';
import { CarritoService } from '../services/carrito/carrito.service';
import { AuthService } from '../services/auth/auth.service';
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
export class CuerpoHomeComponent implements AfterViewInit {
  private productosService = inject(ProductosService);
  terminoActual = '';
  productos: any[] = [];

  isAuthenticated: boolean = false;
  private authSub?: Subscription;

  constructor(
    private router: Router,
    public carritoService: CarritoService,
    private authService: AuthService
  ) {
    this.productosService.getProductos().subscribe((data) => {
      this.productos = data;
    });
  }

  ngAfterViewInit() {
    this.authSub = this.authService.user$.subscribe((user) => {
      this.isAuthenticated = !!user;
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
      cantidad: 1,
    });
    console.log(this.carritoService);
  }
}
