import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../data-access/storage.service';

export const guestGuard: CanActivateFn = (route, state) => {
  const storage = inject(StorageService);
  const router = inject(Router);

  if (!storage.isAuth()) {
    return true;
  }
  return router.navigate(['hub', 'messages']);
};
