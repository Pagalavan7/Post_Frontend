import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoggedInUserData, User } from '../Models/user.model';
import { BehaviorSubject, ReplaySubject, Subject, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedInUser: LoggedInUserData | null = null;

  $loggedInUser = new ReplaySubject<LoggedInUserData | null>(1);

  constructor() {
    console.log('auth service called');
    if (!this.isTokenExpired()) {
      this.userSignedIn$.next(true);
      this.$loggedInUser.next(this.loggedInUser);
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
            this.isTokenExpired();
            this.$loggedInUser.next(this.loggedInUser);
          },
          // error: (err) => console.log('inside tap error :', err),
        })
      );
  }

  logout() {
    localStorage.clear();
    this.userSignedIn$.next(false);
    this.$loggedInUser.next(null);
  }

  isTokenExpired(): boolean {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        this.logout();
        return true;
      }
      const payload: any = jwtDecode(token);

      this.loggedInUser = {
        loggedInUserName: payload.userName,
        loggedInUserEmail: payload.email,
      };

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
