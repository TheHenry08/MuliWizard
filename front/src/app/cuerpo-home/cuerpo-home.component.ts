import {
  Component,
  inject,
  ElementRef,
  AfterViewInit,
  ViewChild,
  Renderer2
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
export class CuerpoHomeComponent {
  private productosService = inject(ProductosService);
  terminoActual = '';
  productos: any[] = [];
  private subBusqueda!: Subscription;

  constructor(private router: Router, private busquedaService: BusquedaService) {
    this.productosService.getProductos().subscribe((data) => {
      this.productos = data;
    });
  }

  redirigirDetalle(producto: any) {
    this.router.navigate(['/detalle', producto.id]);
  }

  // ngOnInit() {
  //   this.subBusqueda = this.busquedaService.terminoBusqueda$.subscribe((termino) => {
  //     this.buscarProductos(termino);
  //   });
  //   this.buscarProductos('');
  // } 

  // buscarProductos(termino: string) {
  //   this.terminoActual = termino.trim();
  //   this.productosService.buscarProductos(this.terminoActual).subscribe((data) => {
  //     this.productos = data;
  //   });
  // }

  // ngOnDestroy() {
  //   this.subBusqueda.unsubscribe();
  // }

}
