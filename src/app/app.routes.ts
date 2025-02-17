import { Routes } from '@angular/router';
import { PerfilComponent } from './perfil/perfil.component';
import { InicioComponent } from './inicio/inicio.component';
import { Top50Component } from './top50/top50.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { IngresoComponent } from './ingreso/ingreso.component';
import { RegistroComponent } from './registro/registro.component';
import { AuthGuard } from './services/auth.guard';
import { AdminComponent } from './admin/admin.component';
import { AdminGuard } from './services/admin.guard';
import { InformacionPeliculaComponent } from './informacion-pelicula/informacion-pelicula.component';
import { ListasComponent } from './listas/listas.component';
import { ListaCrearComponent } from './lista-crear/lista-crear.component';
import { InformacionListaComponent } from './informacion-lista/informacion-lista.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full'
    },
    {
        path:'',
        canActivate: [AuthGuard],
        children: [
            { path:'perfil', component: PerfilComponent },
            { path: 'reviews', component: ReviewsComponent },
            { path: 'listas', component: ListasComponent },
            { path: 'lista-crear', component: ListaCrearComponent},
            { path: 'informacion-pelicula/:id', component: InformacionPeliculaComponent },
            { path: 'informacion-lista/:id', component: InformacionListaComponent },
        ],
    },
    { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
    { path: 'inicio', component: InicioComponent },
    { path: 'top50', component: Top50Component },
    { path: 'ingreso', component: IngresoComponent },
    { path: 'registro', component: RegistroComponent },
];
