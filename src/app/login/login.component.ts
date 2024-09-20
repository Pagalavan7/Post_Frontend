import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../Models/user.model';
import { UserService } from '../Services/create-user.service';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  @ViewChild('loginForm') loginForm!: NgForm;
  ngAfterViewInit() {
    console.log(this.loginForm);
  }

  onFormSubmit() {
    console.log(this.loginForm.value);
    let data: User = this.loginForm.value;
    this.authService.login(data);
    // this.authService.signUp(data).subscribe({
    //   next: (data) => {
    //     console.log(data);
    //   },
    //   complete: () => console.log('observable complete'),
    //   error: (error) => {
    //     console.log('error in signing up', error.error.err);
    //   },
    // });
    this.onFormReset();
  }
  onFormReset() {
    this.loginForm.reset();
  }
}
