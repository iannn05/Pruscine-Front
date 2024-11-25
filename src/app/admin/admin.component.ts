import { Component, NgModule, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../services/user.services';
import { FormBuilder } from '@angular/forms';
import userModel from '../models/user.model';
import { PeliService } from '../services/peli.services';
import { DirectorService } from '../services/director.services';
import { ActorService } from '../services/actor.services';
import { GeneroService } from '../services/genero.services';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [ RouterModule, FormsModule, ReactiveFormsModule, CommonModule, HttpClientModule ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  constructor(private router: Router) {
    
  }

  showPeliculaForm: boolean = false;
  showActorForm: boolean = false;
  showDirectorForm: boolean = false;
  showGeneroForm: boolean = false;

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

  peliculaService: PeliService = inject(PeliService);
  actorService: ActorService = inject(ActorService);
  directorService: DirectorService = inject(DirectorService);
  generoService: GeneroService = inject(GeneroService);
  

  peliculaForm = new FormGroup({
    nombre: new FormControl(''),
    anioPublicado: new FormControl(''),
    pais: new FormControl(''),
  })

  actorForm = new FormGroup({
    nombre: new FormControl(''),
    fechaNacimiento: new FormControl(''),
    descripcion: new FormControl('')
  })

  directorForm = new FormGroup({
    nombre: new FormControl(''),
    fechaNacimiento: new FormControl(''),
    descripcion: new FormControl('')
  })

  generoForm = new FormGroup({
    nombre: new FormControl(''),
  })

  addPelicula(formData: any){
    const body ={
      pelicula:{
        nombre: formData.nombre,
        anioPublicado: formData.anioPublicado,
        pais: formData.pais,
      }
    }

    this.peliculaService.addPelicula(body).subscribe();
  }

  addActor(formData: any){
    const body ={
      actor:{
        nombre: formData.nombre,
        fechaNacimiento: formData.fechaNacimiento,
        descripcion: formData.descripcion
      }
    }

    this.actorService.addActor(body).subscribe();
  }

  addDirector(formData: any){
    const body ={
      director:{
        nombre: formData.nombre,
        fechaNacimiento: formData.fechaNacimiento,
        descripcion: formData.descripcion
      }
    }

    this.directorService.addDirector(body).subscribe();
  }

  addGenero(formData: any){
    console.log("segundo log: " + JSON.stringify(formData));
    this.generoService.addGenero(formData).subscribe();
  }

  agregarPelicula(){
    const formData = this.peliculaForm.value;
    this.addPelicula(formData);
    this.router.navigate(['/admin']);
  }

  agregarActor(){
    const formData = this.actorForm.value;
    this.addActor(formData);
    this.router.navigate(['/admin']);
  }

  agregarDirector(){
    const formData = this.directorForm.value;
    this.addDirector(formData);
    this.router.navigate(['/admin']);
  }

  agregarGenero(){
    const formData = this.generoForm.value;
    console.log("primer log: " + JSON.stringify(formData));
    this.addGenero(formData);
    this.router.navigate(['/admin']);
  }
}
