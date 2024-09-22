import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../Models/user.model';
import { catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  http: HttpClient = inject(HttpClient);

  signUp(data: User) {
    return this.http.post<{ message: string; error: string }>(
      'http://localhost:3000/api/auth/signup',
      data
    );
  }

  login(data: User) {
    return this.http
      .post<{ message: string; error?: string; token?: string }>(
        'http://localhost:3000/api/auth/login',
        data
      )
      .pipe(
        tap({
          next: (x) => {
            localStorage.setItem('jwttoken', x.token!);
          },
          error: (err) => console.log('inside tap error :', err),
        })
      );
  }
}
