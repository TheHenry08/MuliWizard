import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8000/api/productos';

  getProductos(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
  getImagenProducto(id: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/imagen/${id}`, { 
      responseType: 'blob' 
    });
  }

  buscarProductos(termino: string): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8000/api/productos`, {
      params: { nombre: termino }
    });
  }
}
