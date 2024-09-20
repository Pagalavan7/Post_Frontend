import { Injectable } from '@angular/core';
import { User } from '../Models/user.model';

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
}
