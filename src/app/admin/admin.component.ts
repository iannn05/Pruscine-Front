import { Component, NgModule, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../services/user.services';
import { FormBuilder } from '@angular/forms';
import userModel from '../models/user.model';
import { PeliService } from '../services/peli.services';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [ RouterModule, FormsModule, ReactiveFormsModule ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  constructor(private router: Router) {
    
  }

  service: PeliService = inject(PeliService);
  

  applyForm = new FormGroup({
    nombre: new FormControl(''),
    anioPublicado: new FormControl(''),
    pais: new FormControl(''),
    fechaNacimiento: new FormControl('')
  })

  addPelicula(formData: any){
    const body ={
      pelicula:{
        nombre: formData.nombre,
        anioPublicado: formData.email,
        pais: formData.contrasenia,
        fechaNacimiento: formData.fechaNacimiento
      }
    }

    this.service.addUsuario(body).subscribe();
  }

signup(){
  console.log("llegue");
  
  const formData = this.applyForm.value;
  this.addUser(formData);
  this.router.navigate(['/ingreso'])
}
}
