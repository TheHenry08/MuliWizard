import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { ChatSideComponent } from '../chat-side/chat-side.component'
import { ProductosService } from '../services/productos/productos.service';
import { BusquedaService } from '../services/busqueda/busqueda.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth/auth.service';
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
  @ViewChild('alertContainer', { static: false }) alertContainer!: ElementRef;

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
    if(!localStorage.getItem("user") && localStorage.getItem("cart")){
      localStorage.removeItem("cart");
    }
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
  showAlert() {
    this.resetInput();
  
    if (!this.isAuthenticated) {
      // Crear elemento toast
      const toast = document.createElement('div');
      toast.className = 'toast align-items-center text-bg-danger border-0 fade show';
      toast.setAttribute('role', 'alert');
      toast.setAttribute('aria-live', 'assertive');
      toast.setAttribute('aria-atomic', 'true');
  
      toast.innerHTML = `
        <div class="d-flex">
          <div class="toast-body text-center">
            ¡Necesitas iniciar sesión antes de poder acceder al carrito!
          </div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      `;

      this.alertContainer.nativeElement.appendChild(toast);
      setTimeout(() => {
        this.fadeOutAndRemove(toast);
      }, 5000);
    }
  }
  fadeOutAndRemove(toast: HTMLElement){
    toast.classList.remove('show');
    toast.addEventListener('transitionend', () => {
      toast.remove();
    }, { once: true });
  }
  
}