import { Component, ViewChildren, ViewChild ,QueryList, ElementRef, AfterViewInit } from '@angular/core';
import { RouterModule } from '@angular/router'
import { ChatSideComponent } from '../chat-side/chat-side.component'

@Component({
  selector: 'app-plantilla-base',
  standalone: true,
  imports: [RouterModule, ChatSideComponent],
  templateUrl: './plantilla-base.component.html',
  styleUrl: './plantilla-base.component.css'
})
export class PlantillaBaseComponent implements AfterViewInit {

  @ViewChildren('myLink') links!: QueryList<ElementRef>;
  @ViewChild('myButton') button!: ElementRef<HTMLButtonElement>;
  @ViewChild('inputBusqueda') input!: ElementRef<HTMLInputElement>;
  ngAfterViewInit() {}

  onKeyDown(event: any){
    let inputValue = this.input.nativeElement.value;
    if(inputValue != ''){
      if(event.key === 'Enter' && event.type === "keydown"){
        this.onSearch(inputValue);
      }else if(event.type === 'click'){
        this.onSearch(inputValue);
      }
    }
  }
  onSearch(valor: String){
    console.log(valor);
  }
}
