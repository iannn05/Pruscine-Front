import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PeliService } from '../services/peli.services';
import { ListaService } from '../services/lista.services';
import { ListaPeliculaService } from '../services/lista.pelicula.services';
import { map } from 'rxjs';


@Component({
  selector: 'app-informacion-lista',
  standalone: true,
  imports: [RouterModule, CommonModule, HttpClientModule],
  templateUrl: './informacion-lista.component.html',
  styleUrl: './informacion-lista.component.css'
})
export class InformacionListaComponent implements OnInit {

  lista: any = null;
  peliculas: any[] = [];
  listaPeliculas: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private listaService: ListaService,
    private listaPeliculaService: ListaPeliculaService,
    private peliService: PeliService
    ) {}

    ngOnInit(): void {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.getLista(+id);
        this.getListaPelicula(+id);
      }
    }
  
    getLista(id: number) {
      this.listaService.getOneLista(+id).subscribe(
        (data) => {
          this.lista = data;
          console.log('la lista');
          console.log(this.lista);
        },
        (error) => {
          console.error('Error al cargar los detalles de la película:', error);
        }
      );
    }

    getListaPelicula(id: number) {
      this.listaPeliculaService.getPeliculas(+id).subscribe(
        (data) => {
          this.listaPeliculas = data;
          this.listaPeliculas.forEach((pg) => this.getPelicula(pg.peliculaIdpelicula));
        },
        (error) => {
          console.error('Error al cargar los detalles de la película:', error);
        }
      );
    }
  
    getPelicula(id: number) {
      this.peliService.getPeliculas().subscribe(
        (data) => {
          const pelicula = data.find((p: any) => p.idpelicula === id);
          if (pelicula) {
            this.peliculas.push(pelicula);
            console.log("las peliculas de getPelicula");
            console.log(pelicula);
          }
        },
        (error) => {
          console.error('Error al cargar los detalles del género:', error);
        }
      );
    }
  
    deleteLista(listaId: number) {
      if (confirm('¿Estás seguro de que deseas eliminar esta lista?')) {
        this.listaService.deleteLista(listaId).subscribe(
          () => {
            window.location.reload();
          },
          (error) => {
            console.error('Error al eliminar la lista:', error);
          }
        );
      }
    }

}
