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
        this.getListaPelicula(+id);
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
      console.log("getListaPelicula " + id);
      this.listaPeliculaService.getPeliculas(id).subscribe(
        (response) => {
          // Verifica la estructura de la respuesta
          console.log("Respuesta de la API:", JSON.stringify(response));  // Imprime la respuesta completa
    
          // Asigna la respuesta a listaPeliculas
          this.listaPeliculas = response;
    
          // Verifica si la respuesta es un array antes de iterar
          if (Array.isArray(this.listaPeliculas)) {
            console.log("listaPeliculas:", JSON.stringify(this.listaPeliculas));
            
            // Itera sobre la lista y obtiene las películas individuales
            this.listaPeliculas.forEach((pg: { peliculaIdpelicula: number; }) => {
              console.log("Obteniendo película con id:", pg.peliculaIdpelicula);
              this.getPelicula(pg.peliculaIdpelicula);  // Llama a getPeliculas para cada ID de película
            });
          } else {
            console.error("La respuesta no es un array válido.");
          }
        },
        (error) => {
          console.error('Error al cargar las peliculas:', error);
        }
      );
    }
  
    getPelicula(id: number) {
      console.log("getPelicula " + id);
      this.peliService.getOnePelicula(+id).subscribe(
        (data) => {
          console.log(data);
          this.peliculas.push(data);
          // Imprimir cada película de manera más legible
          console.log("peliculas:", this.peliculas);
        },
        (error) => {
          console.error('Error al cargar los detalles de la película:', error);
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
