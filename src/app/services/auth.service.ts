import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../Models/userSignup.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}
  httpClient: HttpClient = inject(HttpClient);

  signUp(user: User): Observable<User> {
    return this.httpClient.post<User>(
      'http://localhost:3000/api/auth/signup',
      user
    );
  }
}
