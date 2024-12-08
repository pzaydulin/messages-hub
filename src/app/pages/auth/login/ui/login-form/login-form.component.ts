import { Component, inject, input, output } from '@angular/core';
import { LoginStatus } from '../../data-access/login.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ILogin } from '../../../../../core/models/auth.interfaces';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PasswordModule,
    InputTextModule,
    ButtonModule,
  ],
  templateUrl: './login-form.component.html'
})
export class LoginFormComponent {
  loginStatus = input.required<LoginStatus>();
  login = output<ILogin>();

  private fb = inject(FormBuilder);

  loginForm: FormGroup = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
}
