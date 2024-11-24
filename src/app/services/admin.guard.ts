import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.services';

export const AdminGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const service = inject(AuthService);

    if (service.loggedIn()) {
        const userData = service.getData();
        console.log('Datos del usuario:', userData);

        if (userData && userData.rol) {
            return true; // Permitir acceso si el rol es válido
        } else {
            console.warn('Acceso denegado: El usuario no tiene permisos de administrador');
            router.navigate(['/inicio']); // Redirigir si no es admin
            return false;
        }
    }

    console.warn('Acceso denegado: El usuario no está logueado');
    router.navigate(['/ingreso']); // Redirigir si no está logueado
    return false;
};


