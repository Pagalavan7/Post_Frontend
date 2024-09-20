// export interface User {
//   name: string;
//   email: string;
//   password: string;
// }

export class User {
  constructor(
    private name: string,
    private email: string,
    private password: string
  ) {}
}
const Users: User[] = [];
