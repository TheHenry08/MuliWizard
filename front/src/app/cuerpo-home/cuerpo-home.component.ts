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

  ngAfterViewInit(): void { console.log('ngAfterViewInit en PlantillaBaseComponent');}

  mostrarProductosEnOferta(): void {
    const divOfertas = this.offers.nativeElement;
    divOfertas.innerHTML = ''; 

    //Variable provisional
    let contador = 0;

    for (let producto of this.productos) {
      if(contador < 10){
      const card = document.createElement('div');
      let iconoEstado :string = this.loadIcons(producto.estado);
        card.innerHTML = `
        <div class="card mb-3" style="max-width: 36vw;">
          <div class="row g-0">
            <div class="col-md-4">
              <img src="images/logo.png" class="img-fluid rounded-start" alt="${producto.nombre}">
            </div>
            <div class="col-md-8">
              <div class="card-body bg-dark text-white">
                <h5 class="card-title">${producto.nombre}</h5>
                <p class="card-text">€${producto.precio}</p>
                <p class="card-text">${iconoEstado}${producto.estado}</p>
                <button class="btn btn-primary">Comprar</button>
              </div>
            </div>
          </div>
        </div>
        `;
        /*card.innerHTML = `
        <div class="card" style="width: 14rem; height: 27rem">
          <img src="images/logo.png" class="card-img-top" alt="${producto.nombre}">
          <div class="card-body bg-dark text-white">
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text">€${producto.precio}</p>
            <p class="card-text">${producto.estado}</p>
            <a href="#" class="btn btn-primary">Comprar</a>
          </div>
        </div>
      `;*/
      
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
      let iconoEstado = this.loadIcons(producto.estado);
      card.innerHTML = `
        <div class="card mb-3" style="max-width: 36vw;">
          <div class="row g-0">
            <div class="col-md-4">
              <img src="images/logo.png" class="img-fluid rounded-start" alt="${producto.nombre}">
            </div>
            <div class="col-md-8">
              <div class="card-body bg-dark text-white">
                <h5 class="card-title">${producto.nombre}</h5>
                <p class="card-text">€${producto.precio}</p>
                <p class="card-text">${iconoEstado}${producto.estado}</p>
                <button class="btn btn-primary">Comprar</button>
              </div>
            </div>
          </div>
        </div>  
      `;
      
      divLanzamientos.appendChild(card);
      contador++;
      }
    }
  }
  loadIcons(estado :string){
    let iconoEstado = '';
    switch(estado.toLowerCase()) {
      case 'nueva':
        iconoEstado = '🆕';
        break;
      case 'usada - excelente':
        iconoEstado = '✨';
        break;
      case 'usada - buena':
        iconoEstado = '🛠️';
        break;
      case 'usada - regular':
        iconoEstado = '⚠️';
        break;
      default:
        iconoEstado = 'ℹ️';
    }
    return iconoEstado;
  }
}
