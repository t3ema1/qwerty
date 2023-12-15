import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const userGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isUser()) {
    return true;
  } else {
    console.log("not a user");
    router.navigate(['/forbidden-component']);
    return false;
  }
};
