import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { PeliService } from '../services/peli.services';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-top50',
  standalone: true,
  imports: [RouterModule, CommonModule, HttpClientModule, FormsModule],
  templateUrl: './top50.component.html',
  styleUrls: ['./top50.component.css']
})
export class Top50Component {
  peliculas: any[] = [];
  filteredPeliculas: any[] = [];
  displayedPeliculas: any[] = [];
  searchQuery: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 8;

  constructor(private peliService: PeliService) { }

  ngOnInit(): void {
    this.peliService.getPeliculas().subscribe(
      (data) => {
        this.peliculas = data;
        this.filteredPeliculas = [...this.peliculas];
        this.paginate(); 
      },
      (error) => {
        console.error('Error al obtener las películas:', error);
      }
    );
  }

  filterPeliculas(): void {
    if (this.searchQuery) {
      this.filteredPeliculas = this.peliculas.filter(pelicula =>
        pelicula.nombre.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredPeliculas = [...this.peliculas];
    }

    this.currentPage = 1;
    this.paginate();
  }

  paginate(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedPeliculas = this.filteredPeliculas.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if ((this.currentPage * this.itemsPerPage) < this.filteredPeliculas.length) {
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
