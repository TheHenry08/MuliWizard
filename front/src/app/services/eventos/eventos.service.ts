import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventosService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8000/api/eventos';

  getEventos(userId: any): Observable<any> {
    return this.http.get(this.apiUrl, { params: { organizador_id: userId } });
  }

  addEventos(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  removeEventos(eventId: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${eventId}`);
  }

  updateEventos(data: any): Observable<any> {
    return this.http.patch(this.apiUrl, data);
  }
}