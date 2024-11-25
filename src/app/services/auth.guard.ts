import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.services';

export const AuthGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const service = inject(AuthService);
    if (service.loggedIn()) {
        return true;
    }
    router.navigate(['/ingreso']);
    return false
}