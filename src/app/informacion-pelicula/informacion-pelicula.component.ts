import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PeliService } from '../services/peli.services';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { GeneroService } from '../services/genero.services';
import { ActorService } from '../services/actor.services';
import { DirectorService } from '../services/director.services';
import { PeliGeneroService } from '../services/peli.genero.services';
import { PeliActorService } from '../services/peli.actor.services';
import { PeliDirectorService } from '../services/peli.director.services';
import { ReviewService } from '../services/review.services';
import { UserService } from '../services/user.services';

@Component({
  selector: 'app-informacion-pelicula',
  standalone: true,
  templateUrl: './informacion-pelicula.component.html',
  imports: [RouterModule, CommonModule, HttpClientModule],
  styleUrls: ['./informacion-pelicula.component.css']
})
export class InformacionPeliculaComponent implements OnInit {
  pelicula: any = null;
  peliculaGeneros: any[] = [];
  peliculaActores: any[] = [];
  peliculaDirectores: any[] = [];
  generos: any[] = [];
  actores: any[] = [];
  directores: any[] = [];
  resenas: any[] = [];
  usuarios: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private peliService: PeliService,
    private generoService: GeneroService,
    private actorService: ActorService,
    private directorService: DirectorService,
    private peliGeneroService: PeliGeneroService,
    private peliActorService: PeliActorService,
    private peliDirectorService: PeliDirectorService,
    private resenaService: ReviewService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getPelicula(+id);
      this.getPeliculaGenero(+id);
      this.getPeliculaActor(+id);
      this.getPeliculaDirector(+id);
      this.getResenas(+id);
      this.getUsuarios();
    }
  }

  getPelicula(id: number) {
    this.peliService.getOnePelicula(+id).subscribe(
      (data) => {
        this.pelicula = data;
      },
      (error) => {
        console.error('Error al cargar los detalles de la película:', error);
      }
    );
  }

  getPeliculaGenero(id: number) {
    this.peliGeneroService.getGeneros(+id).subscribe(
      (data) => {
        this.peliculaGeneros = data;
        this.peliculaGeneros.forEach((pg) => this.getGeneros(pg.generoIdgenero));
      },
      (error) => {
        console.error('Error al cargar los detalles de la película:', error);
      }
    );
  }

  getPeliculaActor(id: number) {
    this.peliActorService.getActores(+id).subscribe(
      (data) => {
        this.peliculaActores = data;
        this.peliculaActores.forEach((pg) => this.getActores(pg.actorIdactor));
      },
      (error) => {
        console.error('Error al cargar los detalles de la película:', error);
      }
    );
  }

  getPeliculaDirector(id: number) {
    this.peliDirectorService.getDirectores(+id).subscribe(
      (data) => {
        this.peliculaDirectores = data;
        this.peliculaDirectores.forEach((pg) => this.getDirectores(pg.directorIddirector));
      },
      (error) => {
        console.error('Error al cargar los detalles de la película:', error);
      }
    );
  }

  getResenas(id: number) {
    this.resenaService.getReviews(+id).subscribe(
      (data) => {
        this.resenas = data;
      },
      (error) => {
        console.error('Error al cargar los detalles de las reseñas:', error);
      }
    );
  }

  getUsuarios() {
    this.userService.getUsuarios().subscribe(
      (data) => {
        if (data && Array.isArray(data.users)) {
          this.usuarios = data.users;
        } else {
          this.usuarios = [];
        }
      },
      (error) => {
        console.error('Error al cargar los detalles de los usuarios:', error);
      }
    );
  }

  getUsuario(id: number): string {
    const usuario = this.usuarios.find(u => u.idusuario === id);
    return usuario ? usuario.nombre : 'Desconocido';
  }

  getGeneros(id: number) {
    this.generoService.getOneGenero(+id).subscribe(
      (data) => {
        this.generos.push(data);
      },
      (error) => {
        console.error('Error al cargar los detalles del género:', error);
      }
    );
  }

  getActores(id: number) {
    this.actorService.getOneActor(+id).subscribe(
      (data) => {
        this.actores.push(data);
      },
      (error) => {
        console.error('Error al cargar los detalles del actor:', error);
      }
    );
  }

  getDirectores(id: number) {
    this.directorService.getOneDirector(+id).subscribe(
      (data) => {
        this.directores.push(data);
      },
      (error) => {
        console.error('Error al cargar los detalles del director:', error);
      }
    );
  }

  get nombresGeneros(): string {
    return this.generos.map(g => g.nombre).join(', ');
  }

  get nombresActores(): string {
    return this.actores.map(g => g.nombre).join(', ');
  }

  get nombresDirectores(): string {
    return this.directores.map(g => g.nombre).join(', ');
  }

  isAdmin(): boolean {
    console.log("isAdmin");
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      
      console.log(payload);
      console.log(payload.rol);
      return payload.rol === 'true';
    }
    return false;
  }

  isOwner(id: number): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.idusuario === id;
    }
    return false;
  }

  deleteResena(peliculaId: number, usuarioId: number) {
    if (confirm('¿Estás seguro de que deseas eliminar esta reseña?')) {
      this.resenaService.deleteReview(peliculaId, usuarioId).subscribe(
        () => {
          window.location.reload();
        },
        (error) => {
          console.error('Error al eliminar la reseña:', error);
        }
      );
    }
  }
}
