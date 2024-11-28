import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PeliService } from '../services/peli.services';
import { ListaService } from '../services/lista.services';
import { ListaPeliculaService } from '../services/lista.pelicula.services';


@Component({
  selector: 'app-informacion-lista',
  standalone: true,
  imports: [RouterModule, CommonModule, HttpClientModule],
  templateUrl: './informacion-lista.component.html',
  styleUrl: './informacion-lista.component.css'
})
export class InformacionListaComponent implements OnInit {

  lista: any = null;
  peliculas: any = [];
  listaPeliculas: any = [];

  constructor(
    private route: ActivatedRoute,
    private listaService: ListaService,
    private listaPeliculaService: ListaPeliculaService
    ) {}

    ngOnInit(): void {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.getLista(+id);
      }
    }
  
    getLista(id: number) {
      this.listaService.getOneLista(+id).subscribe(
        (data) => {
          this.lista = data;
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
          this.listaPeliculas.forEach((pg: { peliculaIdpelicula: number; }) => this.getListaPelicula(pg.peliculaIdpelicula));
        },
        (error) => {
          console.error('Error al cargar las peliculas:', error);
        }
      );
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
