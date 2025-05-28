import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../services/productos/productos.service';

@Component({
  selector: 'app-producto-detalle',
  imports: [CommonModule],
  templateUrl: './producto-detalle.component.html',
  styleUrl: './producto-detalle.component.css'
})
export class ProductoDetalleComponent implements OnInit{

  producto: any;

  constructor(
    private route: ActivatedRoute,
    private productosService: ProductosService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productosService.getProductos().subscribe((productos) => {
        this.producto = productos.find((p: any) => p.id == id);
        console.log('Producto encontrado:', this.producto); // <-- Agrega esto
      });
    } else {
      console.warn('No se encontró ID en la URL');
    }
  }
  
}
