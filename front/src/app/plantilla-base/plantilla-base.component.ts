import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { ChatSideComponent } from '../chat-side/chat-side.component'
import { ProductosService } from '../services/productos/productos.service';
import { BusquedaService } from '../services/busqueda/busqueda.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-plantilla-base',
  standalone: true,
  imports: [RouterModule, ChatSideComponent, CommonModule],
  templateUrl: './plantilla-base.component.html',
  styleUrl: './plantilla-base.component.css'
})
export class PlantillaBaseComponent implements AfterViewInit, OnDestroy {
  @ViewChild('inputBusqueda') input!: ElementRef<HTMLInputElement>;

  isAuthenticated: boolean = false;
  private authSub?: Subscription;

  constructor(
    private busquedaService: BusquedaService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngAfterViewInit() {
    // Suscribirse a los cambios de autenticación
    this.authSub = this.authService.user$.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  onKeyDown(event: KeyboardEvent | MouseEvent) {
    if ((event instanceof KeyboardEvent && event.key === 'Enter') || event instanceof MouseEvent) {
      let inputValue = this.input.nativeElement.value;
      this.onSearch(inputValue);
    }
  }

  onSearch(valor: string) {
    if (valor != '') {
      this.router.navigate(['/search']).then(() => {
        this.busquedaService.actualizarBusqueda(valor);
      });
    } else {
      this.router.navigate(['/']);
    }
  }

  resetInput() {
    this.input.nativeElement.value = "";
  }

  ngOnDestroy() {
    this.authSub?.unsubscribe();
  }
}