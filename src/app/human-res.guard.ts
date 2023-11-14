import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const humanResGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isHr()) {
    return true;
  } else {
    // Redirect to a different route or show an access denied message
    router.navigate(['/forbidden-component']);
    return false;
  }
};
