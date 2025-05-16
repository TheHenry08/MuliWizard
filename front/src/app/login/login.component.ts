import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.http.post('http://localhost:8000/api/login', { email, password }).subscribe({
        next: (res) => console.log('✅ Login exitoso:', res),
        error: (err) => {
          console.error('❌ Error:', err);
          if (err.status === 0) {
            console.error('❌ CORS o servidor no responde');
          } else if (err.status === 401) {
            console.warn('⚠️ Credenciales inválidas');
          }
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
