import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  @ViewChild('loginUser') loginUser!: NgForm;

  onSubmit() {
    console.log(this.loginUser?.value);
  }

  resetForm() {
    this.loginUser?.reset();
  }
}
