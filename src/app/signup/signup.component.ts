import {
  Component,
  ElementRef,
  EventEmitter,
  inject,
  ViewChild,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  @ViewChild('signupForm') signupForm!: NgForm;
  authService: AuthService = inject(AuthService);

  onSubmit() {
    console.log(this.signupForm.value);
    const user = this.signupForm.value;
    this.authService.signUp(user).subscribe({
      next: (response) => {
        console.log(response);
        alert(response.message);
      },
      error: (err) => {
        console.log(err.error);
        alert(err.error.error);
      },
      complete: () => console.log('signup operation complete'),
    });
  }

  resetForm() {
    this.signupForm.reset();
  }
}
