import { Component, AfterViewInit, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventosService } from '../../services/eventos/eventos.service';
@Component({
  selector: 'app-consultar',
  imports: [CommonModule],
  templateUrl: './consultar.component.html',
  styleUrl: './consultar.component.css'
})
export class ConsultarComponent implements OnInit {

  constructor(private eventosService: EventosService){}
  eventos: any[] = [];
  ngOnInit(): void{
    this.eventosService.getAllEventos().subscribe((data) => {
      this.eventos = data;
      console.log("Eventos:", this.eventos);
    });
  }
}
