import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';

export const AuthInterceptorService: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
) => {
  console.log('interceptor method called');
  const bearerToken = `Bearer ${localStorage.getItem('token')}`;
  console.log('the bearer token is', bearerToken);
  const modifiedReq = req.clone({
    headers: req.headers.append('Authorization', bearerToken),
  });

  return next(modifiedReq);
};
