import {
  Component,
  ElementRef,
  EventEmitter,
  inject,
  ViewChild,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  @ViewChild('signupForm') signupForm!: NgForm;

  onSubmit() {
    console.log(this.signupForm?.value);
  }

  resetForm() {
    this.signupForm?.reset();
  }
}
