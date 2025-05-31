// import { inject, Component, AfterViewInit, ElementRef } from '@angular/core';
// import { EventosService } from '../../services/eventos/eventos.service';
// import { CommonModule } from '@angular/common';
// import { ViewChild } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// declare var $: any; // Import jQuery

// @Component({
//   selector: 'app-crear-editar',
//   imports: [CommonModule],
//   templateUrl: './crear-editar.component.html',
//   styleUrl: './crear-editar.component.css'
// })
// export class CrearEditarComponent implements AfterViewInit{
//   private eventosService = inject(EventosService);
//   eventos: any[] = [];
//   eventoSeleccionado: any[] = [];
//   eventoForm: FormGroup;
//   @ViewChild('direccion') private direccionInput!: ElementRef;
//   @ViewChild('juego') private juegoSelect!: ElementRef;
//   @ViewChild('fecha') private fechaInput!: ElementRef;
//   @ViewChild('desc') private descBox!: ElementRef;

//   constructor(private fb: FormBuilder) {
//     const userString = localStorage.getItem("user");
//     const user = userString ? JSON.parse(userString) : null;
  
//     if (user && user.id) {
//       this.eventosService.getEventos(user.id).subscribe((data) => {
//         this.eventos = data;
//         console.log("Eventos:", this.eventos); 
//       });
//     } else {
//       console.warn("Usuario no encontrado en localStorage");
//     }
//     this.eventoForm = this.fb.group({
//       direccion: ['', Validators.required],
//       juego: ['', Validators.required],
//       fecha: ['', Validators.required],
//       desc: ['']
//     });
//   }

//   ngAfterViewInit() {
//     $('#juego').select2({
//       templateResult: this.formatOption,
//       templateSelection: this.formatOption
//     });
//   }

//   formatOption(state: any) {
//     if (!state.id) return state.text;
//     const icon = $(state.element).data('icon');
//     return $(`<span><i class="${icon} me-2"></i>${state.text}</span>`);
//   }

//   enviarForm(event: Event){

//     event.preventDefault();
  
//     const direccion = (document.getElementById('direccion') as HTMLInputElement).value;
//     const juego = (document.getElementById('juego') as HTMLInputElement).value;
//     const fecha = (document.getElementById('fecha') as HTMLInputElement).value;
//     const descripcion = (document.getElementById('descripcion') as HTMLTextAreaElement).value;

//     const userString = localStorage.getItem("user");

//     if (userString) {
//       const user = JSON.parse(userString);
//       const datos = {
//         organizador_id: user.id,
//         direccion,
//         juego,
//         descripcion,
//         fecha,  
//       };
    
//       this.eventosService.addEventos(datos).subscribe({
//         next: (eventoCreado) => {
//           this.eventos.push(eventoCreado);
//         },
//         error: (error) => {
//           console.error("Error al crear evento:", error);
//           alert("Error al crear el evento");
//         }
//       });
//     } else {
//       console.warn("No se encontró el usuario en localStorage");
//     }
//   }    

//   removeEvento(id_evento: any){
//     this.eventosService.removeEventos(id_evento).subscribe({
//       next: () => {
//         this.eventos = this.eventos.filter(e => e.id !== id_evento);
//       },
//       error: (error) => {
//         alert("Error al borrar el evento");
//       }
//     })
//   }

//   getEvento(id_evento: any) {
//     this.eventosService.getEvento(id_evento).subscribe(
//       (evento) => {
//         if (evento && evento.length > 0) {
//           const datosEvento = evento[0]; // Asegúrate de que 'evento' sea un array
//           console.log(datosEvento);
//           this.eventoForm.patchValue({
//             direccion: datosEvento.direccion,
//             juego: datosEvento.juego,
//             fecha: datosEvento.fecha,
//             desc: datosEvento.desc
//           });
//         } else {
//           console.error('No se encontró el evento con el ID proporcionado.');
//         }
//       },
//       (error) => {
//         console.error('Error al obtener el evento:', error);
//       }
//     );
//   }
  
// }
import { Component, AfterViewInit, OnInit } from '@angular/core';
import { EventosService } from '../../services/eventos/eventos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
declare var $: any; // Import jQuery

@Component({
  selector: 'app-crear-editar',
  imports:[ReactiveFormsModule,CommonModule],
  templateUrl: './crear-editar.component.html',
  styleUrls: ['./crear-editar.component.css']
})
export class CrearEditarComponent implements OnInit, AfterViewInit {
  eventos: any[] = [];
  eventoForm: FormGroup;
  isEditMode: boolean = false;
  eventoId: number | null = null; 

  constructor(private fb: FormBuilder, private eventosService: EventosService) {
    this.eventoForm = this.fb.group({
      direccion: ['', Validators.required],
      juego: ['', Validators.required],
      fecha: ['', Validators.required],
      desc: ['']
    });
  }

  ngOnInit(): void {
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

  ngAfterViewInit(): void {
    // Inicializar Select2
    $('#juego').select2({
      templateResult: this.formatOption,
      templateSelection: this.formatOption
    });

    // Sincronizar cambios de Select2 con el FormControl
    $('#juego').on('change', (e: any) => {
      const selectedValue = $(e.target).val();
      this.eventoForm.get('juego')?.setValue(selectedValue);
    });
  }

  formatOption(state: any) {
    if (!state.id) return state.text;
    const icon = $(state.element).data('icon');
    return $(`<span><i class="${icon} me-2"></i>${state.text}</span>`);
  }

  enviarForm(event: Event): void {
    event.preventDefault();

    if (this.eventoForm.valid) {
      const userString = localStorage.getItem("user");
      const user = userString ? JSON.parse(userString) : null;

      if (user && user.id) {
        const datos = {
          organizador_id: user.id,
          direccion: this.eventoForm.value.direccion,
          juego: this.eventoForm.value.juego,
          descripcion: this.eventoForm.value.desc,
          fecha: this.eventoForm.value.fecha
        };

        this.eventosService.addEventos(datos).subscribe({
          next: (eventoCreado) => {
            this.eventos.push(eventoCreado);
            this.eventoForm.reset();
            // Restablecer Select2
            $('#juego').val('').trigger('change');
          },
          error: (error) => {
            console.error("Error al crear evento:", error);
            alert("Error al crear el evento");
          }
        });
      } else {
        console.warn("No se encontró el usuario en localStorage");
      }
    } else {
      console.warn("Formulario inválido");
    }
  }

  removeEvento(id_evento: any): void {
    this.eventosService.removeEventos(id_evento).subscribe({
      next: () => {
        this.eventos = this.eventos.filter(e => e.id !== id_evento);
      },
      error: (error) => {
        alert("Error al borrar el evento");
      }
    });
  }

  getEvento(id_evento: any): void {
    this.eventosService.getEvento(id_evento).subscribe(
      (evento) => {
        if (evento && evento.length > 0) {
          const datosEvento = evento.find((u: { id: any; }) => u.id == id_evento);
          this.eventoForm.patchValue({
            direccion: datosEvento.direccion,
            juego: datosEvento.juego,
            fecha: datosEvento.fecha,
            desc: datosEvento.descripcion
          });
      
          this.eventoId = datosEvento.id;
          this.isEditMode = true;
          $('#juego').val(datosEvento.juego).trigger('change');
          console.log(this.isEditMode);

        } else {
          console.error('No se encontró el evento con el ID proporcionado.');
        }
      },
      (error) => {
        console.error('Error al obtener el evento:', error);
      }
    );
  } 

actualizarEvento() {

  if (this.eventoForm.valid && this.eventoId !== null) {
    const datos = {
      direccion: this.eventoForm.value.direccion,
      juego: this.eventoForm.value.juego,
      descripcion: this.eventoForm.value.desc,
      fecha: this.eventoForm.value.fecha
    };

    this.eventosService.updateEventos(this.eventoId, datos).subscribe({
      next: (eventoActualizado) => {
        const index = this.eventos.findIndex(e => e.id === this.eventoId);
        if (index !== -1) {
          this.eventos[index] = eventoActualizado;
        }
        this.eventoForm.reset();
        this.eventoId = null;
        $('#juego').val('').trigger('change');
        this.cancelarEdicion();
      },
      error: (error) => {
        console.error("Error al actualizar el evento:", error);
        alert("Error al actualizar el evento");
      }
    });
  }
}

  cancelarEdicion() {
    this.eventoForm.reset();
    this.eventoForm.value.juego='';
    $('#juego').val('').trigger('change');
    this.isEditMode = false;
  }
}

