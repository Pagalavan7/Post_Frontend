import {
  Component,
  ElementRef,
  EventEmitter,
  inject,
  ViewChild,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../Models/userSignup.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  constructor(private authService: AuthService) {}

  @ViewChild('signupForm') signupForm!: NgForm;
  ngAfterViewInit() {
    console.log(this.signupForm);
  }

  onFormSubmit() {
    console.log(this.signupForm.value);
    let data: User = this.signupForm.value;
    this.authService.signUp(data);
  }
  onFormReset() {
    console.log('Form reset');
  }
}
