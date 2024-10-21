import { Component, inject, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  @ViewChild('loginUser') loginUser!: NgForm;
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);

  onSubmit() {
    const user = this.loginUser.value;

    this.authService.login(user).subscribe({
      next: (response) => {
        alert(response.message);
        this.router.navigate(['/posts']);
      },
      error: (err) => {
        alert(err.error.error);
      },
    });
  }

  resetForm() {
    this.loginUser?.reset();
  }
}
