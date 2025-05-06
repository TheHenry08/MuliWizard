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

  ngAfterViewInit() {}
}
