import { Routes } from '@angular/router';
import { PerfilComponent } from './perfil/perfil.component';
import { InicioComponent } from './inicio/inicio.component';
import { Top50Component } from './top50/top50.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { IngresoComponent } from './ingreso/ingreso.component';
import { RegistroComponent } from './registro/registro.component';
import { AuthGuard } from './services/auth.guard';
import { AdminComponent } from './admin/admin.component';

export const routes: Routes = [
    {
        path:'',
        canActivate: [AuthGuard],
        children: [
            {path:'perfil', component: PerfilComponent},
            { path: 'admin', component: AdminComponent },
        ],
    },
    { path: '', component: InicioComponent },
    { path: 'top50', component: Top50Component },
    { path: 'reviews', component: ReviewsComponent },
    { path: 'ingreso', component: IngresoComponent },
    { path: 'registro', component: RegistroComponent }
];
