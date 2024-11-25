import { Component } from '@angular/core';
import { AuthService } from '../services/auth.services';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { inject } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-ingreso',
  standalone: true,
  imports: [RouterLink, NgIf, FormsModule, ReactiveFormsModule, RouterModule, HttpClientModule],
  templateUrl: './ingreso.component.html',
  styleUrl: './ingreso.component.css'
})
export class IngresoComponent {

  constructor(private router: Router) {
    
  }

  service: AuthService = inject(AuthService);

  applyForm = new FormGroup({
    email: new FormControl(''),
    contrasenia: new FormControl('')
  })

  authUser(formData: any){
    console.log(formData);
    const body ={
      'email': formData.email,
      'contrasenia': formData.contrasenia,
  }

  this.service.logUser(body).subscribe((res: any) => {
    localStorage.setItem('token', res.token); 
  });
  }

login(){
  console.log("llegue");
  
  const formData = this.applyForm.value;
  this.authUser(formData);
  this.router.navigate(['/']);
}
}
