import { Component, ViewChildren, ViewChild ,QueryList, ElementRef, AfterViewInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router'
import { ChatSideComponent } from '../chat-side/chat-side.component'
import { ProductosService } from '../services/productos/productos.service';
import { BusquedaService } from '../services/busqueda/busqueda.service';

@Component({
  selector: 'app-plantilla-base',
  standalone: true,
  imports: [RouterModule, ChatSideComponent],
  templateUrl: './plantilla-base.component.html',
  styleUrl: './plantilla-base.component.css'
})
export class PlantillaBaseComponent implements AfterViewInit {

  @ViewChild('inputBusqueda') input!: ElementRef<HTMLInputElement>;

  ngAfterViewInit() {}

  constructor(private busquedaService: BusquedaService) {}

  onKeyDown(event: KeyboardEvent | MouseEvent){
    if((event instanceof KeyboardEvent && event.key === 'Enter') || event instanceof MouseEvent){
      let inputValue = this.input.nativeElement.value;
      this.onSearch(inputValue);
    }
  }
  
  onSearch(valor: string){
    this.busquedaService.actualizarBusqueda(valor);
  }
}
