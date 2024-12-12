import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { StorageService } from '../data-access/storage.service';
import { catchError, retry, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const storage = inject(StorageService);
  const router = inject(Router);
  const token = storage.getToken();

console.log('interceptor token',token)
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(req).pipe(
    retry(2),
    catchError((err:HttpErrorResponse) => {
      if (err.status === 401) {
        storage.removeItem();
        router.navigate(['auth/login']);
      }
      return throwError(() => err);
    })
  );
};
