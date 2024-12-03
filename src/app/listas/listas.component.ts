import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../services/auth.services';
import { ListaService } from '../services/lista.services';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listas',
  standalone: true,
  imports: [RouterModule, CommonModule, HttpClientModule, RouterOutlet, FormsModule],
  templateUrl: './listas.component.html',
  styleUrl: './listas.component.css'
})
export class ListasComponent {
  service: AuthService;
  activatedRoute: any;
  listas: any[] = [];
  filteredListas: any[] = [];
  searchQuery: string = '';
  currentPage: number = 1;
  totalPages: number = 1;
  totalItems: number = 0;
  itemsPerPage: number = 8;

  constructor(public authService: AuthService, private listaService: ListaService) {
    this.service = authService;
  }

  ngOnInit(): void {
    // Llamada para obtener las películas de la página 1 por defecto
    this.loadListasPaginadas(this.currentPage);
  }

  loadListasPaginadas(page: number): void {
    this.listaService.getListasPaginadas(page).subscribe(
      (response) => {
        console.log('Respuesta del servicio:', response);
        this.listas = Array.isArray(response.listas) ? response.listas : [];
        this.totalItems = this.listas.length; // Asegúrate de calcular correctamente el total
        this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
        this.updatePagedListas(); // Actualiza las listas para la página actual
      },
      (error) => {
        console.error('Error al obtener las listas:', error);
        this.listas = [];
        this.updatePagedListas(); // Limpia los datos en caso de error
      }
    );
  }
  
  

  // Función para actualizar las películas que se muestran en la página actual
  updatePagedListas(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = this.currentPage * this.itemsPerPage;
    this.filteredListas = this.listas.slice(startIndex, endIndex);
    console.log('Listas filtradas:', this.filteredListas);
  }
  

  // Función para cambiar de página
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagedListas();  // Actualizar las películas según la página seleccionada
    }
  }

  // Función para aplicar el filtro de búsqueda
  filterListas(): void {
    if (this.searchQuery) {
      this.filteredListas = this.listas.filter(lista =>
        lista.nombre.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.updatePagedListas();  // Si no hay búsqueda, mostrar las películas de la página actual
    }
  }
}
