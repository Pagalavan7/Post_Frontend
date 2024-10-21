import {
  Component,
  ElementRef,
  EventEmitter,
  inject,
  ViewChild,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';

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
  router: Router = inject(Router);

  onSubmit() {
    const user = this.signupForm.value;
    this.authService.signUp(user).subscribe({
      next: (response) => {
        alert(response.message);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        alert(err.error.error);
      }
    });
  }

  resetForm() {
    this.signupForm.reset();
  }
}
