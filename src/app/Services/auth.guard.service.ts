import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

export const AuthGuard = () => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  let userLoggedIn = false;

  authService.userSignedIn$.subscribe({
    next: (loginStatus) => {
      console.log('user login status in auth guard: ', loginStatus);
      userLoggedIn = loginStatus;
      if (!userLoggedIn) {
        router
          .navigate(['/login'])
          .then(() => alert('Only logged user can access this page!'));
      }
      alert('user logged in status returned to can activate:' + userLoggedIn);
      return userLoggedIn;
    },
  });
};
