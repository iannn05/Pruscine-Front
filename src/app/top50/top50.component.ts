import { Component } from '@angular/core';
import { PeliService } from '../services/peli.services';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-top50',
  standalone: true,
  imports: [RouterModule, CommonModule, HttpClientModule, FormsModule],
  templateUrl: './top50.component.html',
  styleUrls: ['./top50.component.css']
})
export class Top50Component {
  peliculas: any[] = []; // Array vacío para almacenar todas las películas
  filteredPeliculas: any[] = []; // Películas filtradas según la búsqueda
  searchQuery: string = '';
  currentPage: number = 1;
  totalPages: number = 1;
  totalItems: number = 0;
  itemsPerPage: number = 8;

  constructor(private peliService: PeliService) { }

  ngOnInit(): void {
    // Llamada para obtener las películas de la página 1 por defecto
    this.loadPeliculasPaginadas(this.currentPage);
  }

  loadPeliculasPaginadas(page: number): void {
    this.peliService.getPeliculasPaginadas(page).subscribe(
      (response) => {
        this.peliculas = response; // Asignar directamente el array de películas
        this.totalItems = response.length;  // Total de elementos
        this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);  // Calcular las páginas
        this.updatePagedPeliculas(); // Actualizar las películas de la página actual
      },
      (error) => {
        console.error('Error al obtener las películas paginadas:', error);
      }
    );
  }

  // Función para actualizar las películas que se muestran en la página actual
  updatePagedPeliculas(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = this.currentPage * this.itemsPerPage;
    this.filteredPeliculas = this.peliculas.slice(startIndex, endIndex);
  }

  // Función para cambiar de página
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagedPeliculas();  // Actualizar las películas según la página seleccionada
    }
  }

  // Función para aplicar el filtro de búsqueda
  filterPeliculas(): void {
    if (this.searchQuery) {
      this.filteredPeliculas = this.peliculas.filter(pelicula =>
        pelicula.nombre.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.updatePagedPeliculas();  // Si no hay búsqueda, mostrar las películas de la página actual
    }
  }
}
