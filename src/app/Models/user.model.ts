// export interface User {
//   name: string;
//   email: string;
//   password: string;
// }

export class User {
  userName: string = '';
  email: string = '';
  password: string = '';
  constructor(name: string, email: string, password: string) {
    this.userName = name;
    this.email = email;
    this.password = password;
  }
}
const Users: User[] = [];
