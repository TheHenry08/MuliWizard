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
}
