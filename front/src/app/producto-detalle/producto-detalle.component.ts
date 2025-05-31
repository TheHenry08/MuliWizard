import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../services/productos/productos.service';
import { CarritoService } from '../services/carrito/carrito.service';

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
    private productosService: ProductosService,
    private carritoService: CarritoService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productosService.getProductoPorId(id).subscribe(
        (response) => {
          this.producto = response.data; // accedemos al "data" del JSON
          console.log('Producto encontrado:', this.producto);
        },
        (error) => {
          console.error('Error al obtener el producto:', error);
        }
      );
    } else {
      console.warn('No se encontró ID en la URL');
    }
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
