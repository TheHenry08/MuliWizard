import { Component, OnInit } from '@angular/core';
import { CarritoService, CarritoItem } from '../services/carrito/carrito.service';
import { CommonModule} from '@angular/common';
import { RouterModule } from '@angular/router'

@Component({
  selector: 'app-carrito',
  imports: [RouterModule,CommonModule],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  carrito: CarritoItem[] = [];
  total: number = 0;

  constructor(private carritoService: CarritoService) {}

  ngOnInit() {
    this.carritoService.carrito$.subscribe(items => {
      this.carrito = items;
      this.total = this.carritoService.obtenerTotal();
    });
  }

  eliminar(id: number) {
    this.carritoService.eliminarProducto(id);
  }

  limpiar() {
    this.carritoService.limpiarCarrito();
  }
}
