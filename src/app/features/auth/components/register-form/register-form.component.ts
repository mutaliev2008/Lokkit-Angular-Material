import { Component, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AuthService } from '../../../../core/services/auth.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RegisterRequest } from '../../../../core/models/auth.model';
import { RouterLink } from '@angular/router';
import { ConfirmPasswordValidate } from '../../validators/confirm-password.validator';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-form',
  imports: [
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    RouterLink,
    CommonModule,
  ],
  templateUrl: './register-form.component.html',
})
export class RegisterFormComponent {
  authService = inject(AuthService);

  registerForm = new FormGroup(
    {
      fullname: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12),
      ]),
      confirmPassword: new FormControl('', Validators.required),
    },
    { validators: ConfirmPasswordValidate }
  );
  onSumbit() {
    if (this.registerForm.valid) {
      this.authService
        .registerUser(this.registerForm.value as RegisterRequest)
        .subscribe();
    }
  }
}
