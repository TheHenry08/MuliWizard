import {
  Component,
  inject,
  ElementRef,
  AfterViewInit,
  ViewChild,
  Renderer2,
} from '@angular/core';
import { ProductosService } from '../services/productos/productos.service';
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

  productos: any[] = [];

  constructor(private router: Router) {
    this.productosService.getProductos().subscribe((data) => {
      this.productos = data;
    });
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
