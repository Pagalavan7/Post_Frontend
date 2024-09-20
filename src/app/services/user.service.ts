import { Injectable } from '@angular/core';
import { User } from '../Models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users: User[] = [
    { userName: 'pagal', email: 'pagal@123', password: '123456' },
    { userName: 'udhay', email: 'udhay@123', password: '123456' },
    { userName: 'rahul', email: 'rahul@123', password: '123456' },
  ];
  constructor() {}

  createUser(user: User) {
    this.users.push(user);
    console.log(this.users);
  }

  getAllPosts() {
    return new Observable((sub) => {
      setTimeout(() => {
        sub.next('all posts');
      }, 3000);
    });
  }
}
