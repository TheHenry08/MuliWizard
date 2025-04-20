import {
  Component,
  inject,
  ElementRef,
  AfterViewInit,
  ViewChild,
  Renderer2,
} from '@angular/core';
import { ProductosService } from '../services/productos.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cuerpo-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cuerpo-home.component.html',
  styleUrl: './cuerpo-home.component.css',
})
export class CuerpoHomeComponent implements AfterViewInit {
  @ViewChild('offers') offers!: ElementRef;

  private productosService = inject(ProductosService);
  private renderer = inject(Renderer2);

  productos: any[] = [];

  constructor() {
    this.productosService.getProductos().subscribe((data) => {
      this.productos = data;
      this.mostrarProductosEnOfertas();
    });
  }

  ngAfterViewInit(): void {}

  mostrarProductosEnOfertas(): void {
    if (!this.offers) return;

    const contenedor = this.offers.nativeElement;

    for (let i = 0; i < this.productos.length; i++) {
      const nombre = this.productos[i].nombre;

      const p = this.renderer.createElement('p');
      const texto = this.renderer.createText(nombre);

      this.renderer.appendChild(p, texto);
      this.renderer.appendChild(contenedor, p);
    }
  }
}
