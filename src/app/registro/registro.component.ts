import { Component, NgModule, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../services/user.services';
import { FormBuilder } from '@angular/forms';
import userModel from '../models/user.model';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ RouterModule, FormsModule, ReactiveFormsModule, HttpClientModule ],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  constructor(private router: Router) {
    
  }

  service: UserService = inject(UserService);

  applyForm = new FormGroup({
    nombre: new FormControl(''),
    email: new FormControl(''),
    contrasenia: new FormControl(''),
    fechaNacimiento: new FormControl('')
  })

  addUser(formData: any){
    const body ={
      user:{
        nombre: formData.nombre,
        email: formData.email,
        contrasenia: formData.contrasenia,
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
