import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { PeliService } from '../services/peli.services';

@Component({
  selector: 'app-top50',
  standalone: true,
  imports: [RouterModule, CommonModule, HttpClientModule],
  templateUrl: './top50.component.html',
  styleUrl: './top50.component.css'
})
export class Top50Component {
  peliculas: any[] = [];

  constructor(private peliService: PeliService) { 
    
  }

  ngOnInit(): void {
    this.peliService.getPeliculas().subscribe(
      (data) => {
        this.peliculas = data;
      },
      (error) => {
        console.error('Error al obtener las películas:', error);
      }
    );
  }

}


