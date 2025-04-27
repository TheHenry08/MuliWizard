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
  @ViewChild('latest') latest!: ElementRef;
  private productosService = inject(ProductosService);

  productos: any[] = [];

  constructor() {
    this.productosService.getProductos().subscribe((data) => {
      this.productos = data;
      this.mostrarProductosEnOferta();
      this.mostrarLanzamientos();
    });
  }

  ngAfterViewInit(): void {}

  mostrarProductosEnOferta(): void {
    const divOfertas = this.offers.nativeElement;
    divOfertas.innerHTML = ''; 

    //Variable provisional
    let contador = 0;

    for (let producto of this.productos) {

      if(contador < 10){
      const card = document.createElement('div');
      card.className = 'card mb-3';
      card.style.maxWidth = '540px';
  
        card.innerHTML = `
        <div class="card" style="width: 14rem; height: 27rem">
          <img src="images/logo.png" class="card-img-top" alt="${producto.nombre}">
          <div class="card-body bg-dark text-white">
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text">€${producto.precio}</p>
            <p class="card-text">${producto.estado}</p>
            <a href="#" class="btn btn-primary">Comprar</a>
          </div>
        </div>
      `;
      
      divOfertas.appendChild(card);
      contador++;
      }
    }
  }
  mostrarLanzamientos(){
    const divLanzamientos = this.latest.nativeElement;
    divLanzamientos.innerHTML = ''; 

    //Variable provisional
    let contador = 0;

    for (let producto of this.productos) {

      if(contador < 4){
      const card = document.createElement('div');
      card.className = 'card mb-3';
      card.style.maxWidth = '540px';
  
        card.innerHTML = `
        <div class="card" style="width: 14rem; height: 27rem">
          <img src="images/logo.png" class="card-img-top" alt="${producto.nombre}">
          <div class="card-body bg-dark text-white">
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text">€${producto.precio}</p>
            <p class="card-text">${producto.estado}</p>
            <a href="#" class="btn btn-primary">Comprar</a>
          </div>
        </div>
      `;
      
      divLanzamientos.appendChild(card);
      contador++;
      }
    }
  }
}
