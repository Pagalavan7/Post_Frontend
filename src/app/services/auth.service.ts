import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../Models/user.model';
import { UserService } from './create-user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private userService: UserService) {}
  // httpClient: HttpClient = inject(HttpClient);

  // signUp(user: User): Observable<User> {
  //   console.log(user);
  //   return this.httpClient.post<User>(
  //     'http://localhost:3000/api/auth/signup',
  //     user
  //   );
  // }

  isLogged: boolean = false;

  login(user: User) {
    const { email, password } = user;
    console.log(email, password);
    console.log(this.userService.users);
    const loggedUser = this.userService.users.find((x) => x.email == email)!;
    console.log(loggedUser);
    if (loggedUser == undefined) {
      console.log('user not found');
      this.isLogged = true;
    } else if (loggedUser.password == password) {
      console.log('user login successful');
    } else {
      console.log('Password did not match. Login failed!');
    }
  }
}
