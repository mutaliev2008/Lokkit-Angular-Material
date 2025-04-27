import { inject, Injectable } from '@angular/core';
import { API_URL } from '../api-token';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  delay,
  Observable,
  retry,
  tap,
} from 'rxjs';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import {
  LoginRequest,
  LoginResponse,
  LogoutResponse,
  RegisterRequest,
  RegisterResponse,
} from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly url = inject(API_URL);
  private readonly http = inject(HttpClient);
  private authData = new BehaviorSubject<User | null>(null);
  private router = inject(Router);

  loginUser(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.url}/login`, data).pipe(
      delay(500),
      retry(2),
      tap((res) => {
        localStorage.setItem('token', res.token);
        this.authData.next(res.user);
        this.router.navigate(['/feed']);
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Не удалось войти', error.error);
        throw error;
      })
    );
  }

  registerUser(data: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.url}/register`, data).pipe(
      delay(500),
      retry(2),
      tap((res) => {
        this.router.navigate(['/login']);
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Не удалось зарегистрироваться', error.error);
        throw error;
      })
    );
  }
  logoutUser(): Observable<LogoutResponse> {
    return this.http.post<LogoutResponse>(`${this.url}/logout`, {}).pipe(
      delay(500),
      retry(2),
      tap((res) => {
        this.router.navigate(['/login']);
        localStorage.removeItem('token');
        this.authData.next(null);
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Не удалось зарегистрироваться', error.error);
        throw error;
      })
    );
  }
}
