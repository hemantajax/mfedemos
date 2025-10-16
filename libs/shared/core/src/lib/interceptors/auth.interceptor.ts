import { HttpInterceptorFn } from '@angular/common/http';

/**
 * Auth Interceptor
 * Adds authentication token to requests
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Get token from storage
  const token = localStorage.getItem('token');

  // Clone request and add authorization header if token exists
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(req);
};
