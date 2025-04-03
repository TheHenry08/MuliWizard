import { Component, ViewChildren, QueryList, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-plantilla-base',
  imports: [],
  templateUrl: './plantilla-base.component.html',
  styleUrl: './plantilla-base.component.css'
})
export class PlantillaBaseComponent implements AfterViewInit {
  
  @ViewChildren('myLink') links!: QueryList<ElementRef>;

  ngAfterViewInit() {
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
