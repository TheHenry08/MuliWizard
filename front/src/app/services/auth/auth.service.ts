import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap, BehaviorSubject, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8000';
  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();
  private readonly USER_KEY = 'user';
  private readonly TOKEN_KEY = 'auth_token';

  constructor(private http: HttpClient) {
    // Cargar usuario y token del localStorage al inicializar el servicio
    this.loadUserFromStorage();
  }

  private loadUserFromStorage(): void {
    const storedUser = localStorage.getItem(this.USER_KEY);
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        this.userSubject.next(user);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        this.clearStorage();
      }
    }
  }

  private saveUserToStorage(user: any, token?: string): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    if (token) {
      localStorage.setItem(this.TOKEN_KEY, token);
    }
  }

  private clearStorage(): void {
    localStorage.removeItem(this.USER_KEY);
    localStorage.removeItem(this.TOKEN_KEY);
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem(this.TOKEN_KEY);
    return token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : new HttpHeaders();
  }

  get csrf() {
    return this.http.get(`${this.apiUrl}/sanctum/csrf-cookie`, { withCredentials: true });
  }

  login(email: string, password: string): Observable<any> {
    return this.csrf.pipe(
      switchMap(() =>
        this.http.post(`${this.apiUrl}/api/login`, { email, password }, { 
          withCredentials: true 
        }).pipe(
          tap((res: any) => {
            this.saveUserToStorage(res.user, res.token);
            this.userSubject.next(res.user);
          }),
          catchError((error) => {
            console.error('Login error:', error);
            throw error;
          })
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
        this.http.post(`${this.apiUrl}/api/register`, data, { 
          withCredentials: true 
        }).pipe(
          tap((res: any) => {
            if (res.user && res.token) {
              this.saveUserToStorage(res.user, res.token);
              this.userSubject.next(res.user);
            }
          }),
          catchError((error) => {
            console.error('Register error:', error);
            throw error;
          })
        )
      )
    );
  }

  logout(): Observable<any> {
    const headers = this.getAuthHeaders();
    
    return this.http.post(`${this.apiUrl}/api/logout`, {}, { 
      withCredentials: true,
      headers 
    }).pipe(
      tap(() => {
        this.clearStorage();
        this.userSubject.next(null);
      }),
      catchError((error) => {
        console.error('Logout error:', error);
        this.clearStorage();
        this.userSubject.next(null);
        return of(null);
      })
    );
  }

  checkAuth(): Observable<any> {
    const token = localStorage.getItem(this.TOKEN_KEY);
    
    if (!token) {
      this.userSubject.next(null);
      return of(null);
    }

    const headers = this.getAuthHeaders();
    
    return this.http.get(`${this.apiUrl}/api/user`, { 
      withCredentials: true,
      headers 
    }).pipe(
      tap((user: any) => {
        this.saveUserToStorage(user);
        this.userSubject.next(user);
      }),
      catchError((error) => {
        console.error('Auth check error:', error);
        this.clearStorage();
        this.userSubject.next(null);
        return of(null);
      })
    );
  }

  isAuthenticated(): Observable<boolean> {
    return this.user$.pipe(map(user => !!user));
  }

  // Método para verificar si hay una sesión guardada
  hasStoredSession(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY) && !!localStorage.getItem(this.USER_KEY);
  }

  // Método para obtener el usuario actual
  getCurrentUser(): any {
    return this.userSubject.value;
  }

  // Método para forzar logout local (útil para casos de emergencia)
  forceLogout(): void {
    this.clearStorage();
    this.userSubject.next(null);
  }
}