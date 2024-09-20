import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../Models/user.model';
import { UserService } from './create-user.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // httpClient: HttpClient = inject(HttpClient);

  // signUp(user: User): Observable<User> {
  //   console.log(user);
  //   return this.httpClient.post<User>(
  //     'http://localhost:3000/api/auth/signup',
  //     user
  //   );
  // }
  constructor(private userService: UserService, private router: Router) {}

  isLogged: boolean = false;

  login(user: User) {
    const { email, password } = user;
    console.log(email, password);
    console.log(this.userService.users);
    const loggedUser = this.userService.users.find((x) => x.email == email)!;
    console.log(loggedUser);
    if (loggedUser == undefined) {
      alert('user not found');
    } else if (loggedUser.password == password) {
      alert('user login successful');
      this.isLogged = true;
      this.router.navigate(['/posts']);
    } else {
      alert('Password did not match. Login failed!');
    }
  }

  logout() {
    this.isLogged = false;
  }

  isAuthenticated() {
    return this.isLogged;
  }
}
