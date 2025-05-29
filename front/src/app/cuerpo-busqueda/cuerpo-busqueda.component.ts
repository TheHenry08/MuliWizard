import {
  Component,
  inject,
  ElementRef,
  AfterViewInit,
  ViewChild,
  Renderer2,
  OnInit,
  OnDestroy
} from '@angular/core';
import { BusquedaService } from '../services/busqueda/busqueda.service';
import { ProductosService } from '../services/productos/productos.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RespuestaApiProductos, Producto } from '../interfaces/producto.interface';

@Component({
  selector: 'app-cuerpo-busqueda',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cuerpo-busqueda.component.html',
  styleUrl: './cuerpo-busqueda.component.css'
})
export class CuerpoBusquedaComponent implements OnInit, OnDestroy{
  cargando: boolean = false;
  private productosService = inject(ProductosService);
  terminoActual = '';
  productos: Producto[] = [];
  private subBusqueda!: Subscription;

  constructor(private router: Router,private busquedaService: BusquedaService) {
    this.productosService.buscarProductos(this.terminoActual).subscribe({
      next: (respuesta: RespuestaApiProductos) => {
        this.productos = respuesta.data;
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al buscar productos:', error);
        this.productos = [];
        this.cargando = false;
      }
    });
  }

  ngOnInit() {
    this.subBusqueda = this.busquedaService.terminoBusqueda$.subscribe((termino) => {
      this.buscarProductos(termino);
    });
  } 

  buscarProductos(termino: string) {
    this.terminoActual = termino.trim();
    this.cargando = true;
    this.productosService.buscarProductos(this.terminoActual).subscribe({
      next: (respuesta: RespuestaApiProductos) => {
        this.productos = respuesta.data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error:', err);
        this.productos = [];
        this.cargando = false;
      }
    });
  }
  
  ngOnDestroy() {
    this.subBusqueda.unsubscribe();
  }

  redirigirDetalle(producto: any) {
    this.router.navigate(['/detalle', producto.id]);
  }
}
