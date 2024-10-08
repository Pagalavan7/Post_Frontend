import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';

export const AuthInterceptorService: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
) => {
  console.log('interceptor called..');
  const authService = inject(AuthService);
  const authToken = localStorage.getItem('token');
  const router = inject(Router);
  if (authToken && authService.isTokenExpired()) {
    authService.logout();
    router.navigate(['/login']);
    return EMPTY;
  } else {
    const bearerToken = `Bearer ${authToken}`;
    const modifiedReq = req.clone({
      headers: req.headers.append('Authorization', bearerToken),
    });
    return next(modifiedReq);
  }
};
