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
import { Router } from '@angular/router';

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

  ngAfterViewInit(): void { console.log('ngAfterViewInit en PlantillaBaseComponent');}
 
  loadIcons(estado :string){
    let iconoEstado = '';
    switch(estado.toLowerCase()) {
      case 'nueva':
        iconoEstado = 'MT';
        break;
      case 'casi nueva':
        iconoEstado = 'NM';
        break;
      case 'excelente':
        iconoEstado = 'EX';
        break;
      case 'bien':
        iconoEstado = 'GD';
        break;
      case 'poco jugada':
        iconoEstado = 'LP';
        break;
      case 'jugada':
        iconoEstado = 'PL';
        break;
      case 'pobre':
        iconoEstado = 'PO';
        break;
      default:
        iconoEstado = 'ℹ️';
    }
    return iconoEstado;
  }
  redirigirDetalle(producto: any) {
    console.log('Producto clicado:', producto);
    this.router.navigate(['/detalle', producto.nombre]);
  }
}
