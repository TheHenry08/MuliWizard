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
  productos: any[] = [];
  private subBusqueda!: Subscription;

  constructor(private router: Router,private busquedaService: BusquedaService) {
    this.productosService.getProductos().subscribe((data) => {
      this.productos = data;
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
    this.productosService.buscarProductos(this.terminoActual).subscribe((data) => {
      this.productos = data;
      this.cargando = false;
    });
  }

  ngOnDestroy() {
    this.subBusqueda.unsubscribe();
  }

  redirigirDetalle(producto: any) {
    this.router.navigate(['/detalle', producto.id]);
  }

}
