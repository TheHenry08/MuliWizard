import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, BehaviorSubject, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8000';
  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {}

  get csrf() {
    return this.http.get(`${this.apiUrl}/sanctum/csrf-cookie`, { withCredentials: true });
  }

  login(email: string, password: string): Observable<any> {
    return this.csrf.pipe(
      switchMap(() =>
        this.http.post(`${this.apiUrl}/api/login`, { email, password }, { withCredentials: true }).pipe(
          tap((res: any) => this.userSubject.next(res.user))
        )
      )
    );
  }

  register(data: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
  }): Observable<any> {
    return this.csrf.pipe(
      switchMap(() =>
        this.http.post(`${this.apiUrl}/api/register`, data, { withCredentials: true })
      )
    );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/logout`, {}, { withCredentials: true }).pipe(
      tap(() => this.userSubject.next(null))
    );
  }

  checkAuth(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/user`, { withCredentials: true }).pipe(
      tap((user: any) => this.userSubject.next(user)),
      catchError(() => {
        this.userSubject.next(null);
        return of(null);
      })
    );
  }

  isAuthenticated(): Observable<boolean> {
    return this.user$.pipe(map(user => !!user));
  }
}
