import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RespuestaApiProductos } from '../../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8000/api/productos';

  getProductos(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getProductoPorId(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  getImagenProducto(id: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/imagen/${id}`, { 
      responseType: 'blob' 
    });
  }

  buscarProductos(termino: string): Observable<RespuestaApiProductos> {
    return this.http.get<RespuestaApiProductos>(this.apiUrl, {
      params: { nombre: termino }
    });
  }
}
