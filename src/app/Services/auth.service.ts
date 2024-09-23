import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../Models/user.model';
import { BehaviorSubject, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  http: HttpClient = inject(HttpClient);

  userSignedIn$ = new BehaviorSubject<boolean>(false);

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
            localStorage.setItem('token', x.token!);
            this.userSignedIn$.next(true);
          },
          error: (err) => console.log('inside tap error :', err),
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    alert('User logged out');
    this.userSignedIn$.next(false);
  }

  isTokenExpired(): boolean {
    console.log('im called');
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        this.logout();
        return true;
      }
      const payload = jwtDecode(token);
      console.log(payload);
      if (!payload.exp) {
        this.logout();
        return true;
      }
      const currentTime = Math.floor(Date.now() / 1000);
      console.log(currentTime);
      if (payload.exp < currentTime) {
        console.log('payload expired', payload);
        this.logout();
        return true;
      }
      return false;
    } catch (err) {
      this.logout();
      console.log(err);
      return true;
    }
  }
}
