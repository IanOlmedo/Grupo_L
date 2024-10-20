import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authroleGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const role = localStorage.getItem('user_role');
  if (!role || role !== 'admin') {
    router.navigateByUrl('home');
    return false;
  } else {
    return true;
  }
};


