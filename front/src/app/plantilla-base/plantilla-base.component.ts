import { Component, ViewChildren, ViewChild ,QueryList, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-plantilla-base',
  standalone: true,
  imports: [],
  templateUrl: './plantilla-base.component.html',
  styleUrl: './plantilla-base.component.css'
})
export class PlantillaBaseComponent implements AfterViewInit {

  @ViewChildren('myLink') links!: QueryList<ElementRef>;
  @ViewChild('myButton') button!: ElementRef<HTMLButtonElement>;

  ngAfterViewInit() {
    const boton = this.button.nativeElement;
    if(boton){
      console.log("Botón encontrado:", boton);
      boton.addEventListener('mouseout', () => {
        boton.classList.remove('text-dark');  // Eliminar la clase text-dark
        boton.classList.remove('bg-light');   // Eliminar la clase bg-light
        boton.classList.add('text-light');    // Agregar la clase text-light
      });
      boton.addEventListener('mouseover', () => {
        boton.classList.remove('text-light');  // Eliminar la clase text-light si existe
        boton.classList.remove('bg-black');   // Eliminar la clase bg-black si existe
        boton.classList.add('text-dark');     // Agregar la clase text-dark
        boton.classList.add('bg-light');      // Agregar la clase bg-light
      });
    }
    this.links.forEach((link) => {
      const element = link.nativeElement as HTMLAnchorElement;
      element.addEventListener('mouseover', () => {
        element.style.color = 'grey'; 
      });

      element.addEventListener('mouseout', () => {
        element.style.color = ''; 
      });
    });
  }
}
