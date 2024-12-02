import { Component, NgModule, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PeliService } from '../services/peli.services';
import { ListaService } from '../services/lista.services';
import { AuthService } from '../services/auth.services';

@Component({
  selector: 'app-lista-crear',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './lista-crear.component.html',
  styleUrl: './lista-crear.component.css',
})
export class ListaCrearComponent implements OnInit {
  listaForm!: FormGroup;
  peliculas: any[] = []; // Lista completa de películas
  filteredPeliculas: any[] = []; // Películas filtradas
  searchTerm: string = ''; // Término de búsqueda

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private peliculaService: PeliService,
    private listaService: ListaService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.listaForm = this.fb.group({
      nombre: ['', Validators.required],
      peliculas: this.fb.array([]),
    });

    this.peliculaService.getPeliculas().subscribe((data) => {
      this.peliculas = Array.isArray(data) ? data : [];
      this.filteredPeliculas = this.peliculas; // Inicialmente mostramos todas las películas
    });
  }

  get peliculasArray(): FormArray {
    return this.listaForm.get('peliculas') as FormArray;
  }

  addPelicula() {
    this.peliculasArray.push(this.fb.control('', Validators.required));
  }

  removePelicula(index: number) {
    this.peliculasArray.removeAt(index);
  }

  // Filtra las películas en función del término de búsqueda
  filterPeliculas() {
    if (this.searchTerm) {
      this.filteredPeliculas = this.peliculas.filter((pelicula) =>
        pelicula.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredPeliculas = this.peliculas;
    }
  }

  agregarLista(): void {
    console.log('Estado del formulario:', this.listaForm.status);
    console.log('Datos del formulario:', this.listaForm.value);
    const userData = this.authService.getData();
    console.log('Datos del usuario:' + userData.idusuario);

    if (this.listaForm.valid) {
      console.log('Lista enviada:', this.listaForm.value);
      this.listaService.addLista(this.listaForm.value, userData.idusuario).subscribe(() => {
        window.location.reload();
      });
    }
  }
}

