import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buscador',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent {
  private router = inject(Router);
  searchTerm = '';
  resultadosFiltrados: any[] = [];

  productos = [
    { id: 1, nombre: 'Liliana of the Veil' },
    { id: 2, nombre: 'Charizard 1st Edition' },
    { id: 3, nombre: 'Blue-Eyes White Dragon' },
    { id: 4, nombre: 'Zoro SR' },
  ];

  filtrarProductos() {
    const term = this.searchTerm.toLowerCase();
    this.resultadosFiltrados = this.productos.filter(p =>
      p.nombre.toLowerCase().includes(term)
    );
  }

  seleccionarProducto(producto: any) {
    this.searchTerm = producto.nombre;
    this.resultadosFiltrados = [];
    // Redirigir a una página de detalles (ajusta la ruta según tu app)
    this.router.navigate(['/producto', producto.id]);
  }
}