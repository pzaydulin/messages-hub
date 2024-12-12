import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../data-access/storage.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {

  const storage = inject(StorageService)
  const router = inject(Router)
  if(storage.isAuth()) {
    return true;
  }
  return router.navigate(['auth', 'login']);
};
