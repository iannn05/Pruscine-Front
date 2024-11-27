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

  constructor(
    private route: ActivatedRoute,
    private peliService: PeliService,
    private generoService: GeneroService,
    private actorService: ActorService,
    private directorService: DirectorService,
    private peliGeneroService: PeliGeneroService,
    private peliActorService: PeliActorService,
    private peliDirectorService: PeliDirectorService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getPelicula(+id);
      this.getPeliculaGenero(+id);
      this.getPeliculaActor(+id);
      this.getPeliculaDirector(+id);
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
        console.log(this.peliculaGeneros);
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
        console.log(this.peliculaActores);
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
        console.log(this.peliculaDirectores);
        this.peliculaDirectores.forEach((pg) => this.getDirectores(pg.directorIddirector));
      },
      (error) => {
        console.error('Error al cargar los detalles de la película:', error);
      }
    );
  }

  getGeneros(id: number) {
    this.generoService.getOneGenero(+id).subscribe(
      (data) => {
        this.generos.push(data);
        console.log(this.generos);
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
        console.log(this.actores);
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
        console.log(this.generos);
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
}
