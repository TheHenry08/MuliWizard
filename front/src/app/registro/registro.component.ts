import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, HttpClientModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}
  validationErrors: { [key: string]: string[] } = {};
  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const { name, email, password, confirmPassword } =
        this.registerForm.value;

      this.http
        .post('http://localhost:8000/api/register', {
          name,
          email,
          password,
          password_confirmation: confirmPassword,
        })
        .subscribe({
          next: (res) => {
            console.log('✅ Usuario registrado:', res);
            this.router.navigate(['/login']); // Redirigir al login después de registrar
          },
          error: (err) => {
            console.error('❌ Error al registrar:', err);

            if (err.status === 422) {
              this.validationErrors = err.error.errors || {};
            }
          },
        });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
