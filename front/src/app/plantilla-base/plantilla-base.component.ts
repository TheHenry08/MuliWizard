import { Component, ViewChildren, ViewChild ,QueryList, ElementRef, AfterViewInit } from '@angular/core';
import { RouterModule } from '@angular/router'
@Component({
  selector: 'app-plantilla-base',
  standalone: true,
  imports: [RouterModule],
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
        boton.classList.remove('text-dark');  
        boton.classList.remove('bg-light');   
        boton.classList.add('text-light');   
      });
      boton.addEventListener('mouseover', () => {
        boton.classList.remove('text-light'); 
        boton.classList.remove('bg-black');   
        boton.classList.add('text-dark');     
        boton.classList.add('bg-light');      
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
