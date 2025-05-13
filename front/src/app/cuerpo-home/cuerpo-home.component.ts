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
import { ProductosService } from '../services/productos/productos.service';
import { BusquedaService } from '../services/busqueda/busqueda.service';
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
export class CuerpoHomeComponent implements AfterViewInit, OnInit, OnDestroy {
  private productosService = inject(ProductosService);
  terminoActual = '';
  productos: any[] = [];
  productosFiltro: any[] = [];
  private subBusqueda!: Subscription;

  constructor(private router: Router, private busquedaService: BusquedaService) {
    this.productosService.getProductos().subscribe((data) => {
      this.productos = data;
    });
  }

  ngOnInit() {
    this.subBusqueda = this.busquedaService.terminoBusqueda$.subscribe((termino) => {
      this.buscarProductos(termino);
    });
    this.buscarProductos('');
  } 

  buscarProductos(termino: string) {
    this.terminoActual = termino.trim();
    console.log(this.terminoActual);
    this.productosService.buscarProductos(this.terminoActual).subscribe((data) => {
      this.productos = data;
      console.log(this.productos);
    });
  }

  ngOnDestroy() {
    this.subBusqueda.unsubscribe();
  }


  ngAfterViewInit(): void {
    setTimeout(() => {
      const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
      popoverTriggerList.forEach((popoverTriggerEl: any) => {
        new bootstrap.Popover(popoverTriggerEl);
      });
    });
  }
 
  redirigirDetalle(producto: any) {
    console.log('Producto clicado:', producto);
    this.router.navigate(['/detalle', producto.id]);
  }
}
