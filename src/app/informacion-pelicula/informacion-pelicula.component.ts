import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PeliService } from '../services/peli.services';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { GeneroService } from '../services/genero.services';
import { ActorService } from '../services/actor.services';
import { DirectorService } from '../services/director.services';
import { PeliGeneroService } from '../services/peli.genero.services';

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
  generos: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private peliService: PeliService,
    private generoService: GeneroService,
    private actorService: ActorService,
    private directorService: DirectorService,
    private peliGenero: PeliGeneroService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getPelicula(+id);
      this.getPeliculaGenero(+id);
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
    this.peliGenero.getGeneros(+id).subscribe(
      (data) => {
        this.peliculaGeneros = data;
        console.log(this.peliculaGeneros);

        // Cargar los detalles de cada género
        this.peliculaGeneros.forEach((pg) => this.getGeneros(pg.generoIdgenero));
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

  get nombresGeneros(): string {
    return this.generos.map(g => g.nombre).join(', ');
  }
}
