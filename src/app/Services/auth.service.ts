import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../Models/user.model';
import { BehaviorSubject, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedUserName: string | undefined;

  constructor() {
    if (!this.isTokenExpired()) {
      this.userSignedIn$.next(true);
    }
  }

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
          // error: (err) => console.log('inside tap error :', err),
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    this.userSignedIn$.next(false);
  }

  isTokenExpired(): boolean {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        this.logout();
        return true;
      }
      const payload: any = jwtDecode(token);
      this.loggedUserName = payload.userName;

      if (!payload.exp) {
        this.logout();
        return true;
      }
      const currentTime = Math.floor(Date.now() / 1000);

      if (payload.exp < currentTime) {
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
