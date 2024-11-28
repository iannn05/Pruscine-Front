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
  displayedListas: any[] = [];
  searchQuery: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 8;

  constructor(public authService: AuthService, private listaService: ListaService) {
    this.service = authService;
  }

  ngOnInit(): void {
    this.listaService.getListas().subscribe(
      (data) => {
        this.listas = data.listas;
        console.log(this.listas);
        this.filteredListas = [...this.listas];
        this.paginate(); 
      },
      (error) => {
        console.error('Error al obtener las películas:', error);
      }
    );
  }

  filterListas(): void {
    if (this.searchQuery) {
      this.filteredListas = this.listas.filter(lista =>
        lista.nombre.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredListas = [...this.listas];
    }

    this.currentPage = 1;
    this.paginate();
  }

  paginate(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedListas = this.filteredListas.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if ((this.currentPage * this.itemsPerPage) < this.filteredListas.length) {
      this.currentPage++;
      this.paginate();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginate();
    }
  }
}
