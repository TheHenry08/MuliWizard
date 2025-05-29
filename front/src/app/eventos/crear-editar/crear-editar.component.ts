import { inject, Component, AfterViewInit } from '@angular/core';
import { EventosService } from '../../services/eventos/eventos.service';
import { CommonModule } from '@angular/common';

declare var $: any; // Import jQuery

@Component({
  selector: 'app-crear-editar',
  imports: [CommonModule],
  templateUrl: './crear-editar.component.html',
  styleUrl: './crear-editar.component.css'
})
export class CrearEditarComponent implements AfterViewInit{
  private eventosService = inject(EventosService);
  eventos: any[] = [];

  constructor() {
    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;
  
    if (user && user.id) {
      this.eventosService.getEventos(user.id).subscribe((data) => {
        this.eventos = data;
        console.log("Eventos:", this.eventos); 
      });
    } else {
      console.warn("Usuario no encontrado en localStorage");
    }
  }

  ngAfterViewInit() {
    $('#juego').select2({
      templateResult: this.formatOption,
      templateSelection: this.formatOption
    });
  }

  formatOption(state: any) {
    if (!state.id) return state.text;
    const icon = $(state.element).data('icon');
    return $(`<span><i class="${icon} me-2"></i>${state.text}</span>`);
  }

  enviarForm(event: Event){

    event.preventDefault();
  
    const direccion = (document.getElementById('direccion') as HTMLInputElement).value;
    const juego = (document.getElementById('juego') as HTMLInputElement).value;
    const fecha = (document.getElementById('fecha') as HTMLInputElement).value;
    const descripcion = (document.getElementById('descripcion') as HTMLTextAreaElement).value;

    const userString = localStorage.getItem("user");

    if (userString) {
      const user = JSON.parse(userString);
      const datos = {
        organizador_id: user.id,
        direccion,
        juego,
        descripcion,
        fecha,  
      };
    
      this.eventosService.addEventos(datos).subscribe({
        next: (eventoCreado) => {
          this.eventos.push(eventoCreado);
        },
        error: (error) => {
          console.error("Error al crear evento:", error);
          alert("Error al crear el evento");
        }
      });
    } else {
      console.warn("No se encontró el usuario en localStorage");
    }
  }    

  removeEvento(id_evento: any){
    this.eventosService.removeEventos(id_evento).subscribe({
      next: () => {
        this.eventos = this.eventos.filter(e => e.id !== id_evento);
      },
      error: (error) => {
        alert("Error al borrar el evento");
      }
    })
  }
}

