import { Component, NgModule, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PeliService } from '../services/peli.services';
import { DirectorService } from '../services/director.services';
import { ActorService } from '../services/actor.services';
import { GeneroService } from '../services/genero.services';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent implements OnInit {
  showPeliculaForm: boolean = false;
  showActorForm: boolean = false;
  showDirectorForm: boolean = false;
  showGeneroForm: boolean = false;

  // Formularios
  peliculaForm!: FormGroup;
  actorForm!: FormGroup;
  directorForm!: FormGroup;
  generoForm!: FormGroup;

  // Datos dinámicos
  generos: any[] = [];
  actores: any[] = [];
  directores: any[] = [];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private peliculaService: PeliService,
    private generoService: GeneroService,
    private actorService: ActorService,
    private directorService: DirectorService
  ) {}

  ngOnInit(): void {
    // Inicializar formularios
    this.peliculaForm = this.fb.group({
      nombre: ['', Validators.required],
      anioPublicado: ['', Validators.required],
      pais: ['', Validators.required],
      generos: this.fb.array([]),
      actores: this.fb.array([]),
      directores: this.fb.array([]),
    });

    this.actorForm = this.fb.group({
      nombre: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      descripcion: ['', Validators.required],
    });

    this.directorForm = this.fb.group({
      nombre: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      descripcion: ['', Validators.required],
    });

    this.generoForm = this.fb.group({
      nombre: ['', Validators.required],
    });

    // Cargar datos desde el backend
    this.generoService.getGeneros().subscribe((data) => {
      this.generos = Array.isArray(data) ? data : [];
    });
    this.actorService.getActores().subscribe((data) => {
      this.actores = Array.isArray(data) ? data : [];
    });
    this.directorService.getDirectores().subscribe((data) => {
      this.directores = Array.isArray(data) ? data : [];
    });
    
  }

  // Getters para los FormArray dinámicos
  get generosArray(): FormArray {
    return this.peliculaForm.get('generos') as FormArray;
  }

  get actoresArray(): FormArray {
    return this.peliculaForm.get('actores') as FormArray;
  }

  get directoresArray(): FormArray {
    return this.peliculaForm.get('directores') as FormArray;
  }

  // Métodos para agregar campos dinámicos
  addGenero() {
    this.generosArray.push(this.fb.control('', Validators.required));
  }

  addActor() {
    this.actoresArray.push(this.fb.control('', Validators.required));
  }

  addDirector() {
    this.directoresArray.push(this.fb.control('', Validators.required));
  }

  // Métodos para eliminar campos dinámicos
  removeGenero(index: number) {
    this.generosArray.removeAt(index);
  }

  removeActor(index: number) {
    this.actoresArray.removeAt(index);
  }

  removeDirector(index: number) {
    this.directoresArray.removeAt(index);
  }

  // Métodos para agregar datos
  agregarPelicula() {
    if (this.peliculaForm.valid) {
      this.peliculaService.addPelicula(this.peliculaForm.value).subscribe(() => {
        window.location.reload();
      });
    }
  }

  agregarActor() {
    if (this.actorForm.valid) {
      this.actorService.addActor(this.actorForm.value).subscribe(() => {
        window.location.reload();
      });
    }
  }

  agregarDirector() {
    if (this.directorForm.valid) {
      this.directorService.addDirector(this.directorForm.value).subscribe(() => {
        window.location.reload();
      });
    }
  }

  agregarGenero() {
    if (this.generoForm.valid) {
      this.generoService.addGenero(this.generoForm.value).subscribe(() => {
        window.location.reload();
      });
    }
  }

  

  toggleForm(form: string) {
    switch (form) {
      case 'pelicula':
        this.showPeliculaForm = !this.showPeliculaForm;
        break;
      case 'actor':
        this.showActorForm = !this.showActorForm;
        break;
      case 'director':
        this.showDirectorForm = !this.showDirectorForm;
        break;
      case 'genero':
        this.showGeneroForm = !this.showGeneroForm;
        break;
    }
  }
}
