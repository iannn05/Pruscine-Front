
import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { IUser } from '../models/user.model';
import { UserService } from '../services/user.services';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.services';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';




@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',  
  styleUrls: ['./perfil.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule]  
})
export class PerfilComponent implements OnInit {
  
  modificar = false;
  formulario: FormGroup;
  usuario: IUser;
  router: Router;

  constructor(private userService: UserService, private authService: AuthService) {
    this.router = inject(Router);
    this.usuario = {} as IUser;

    this.formulario = new FormGroup({
      nombre: new FormControl(this.usuario.nombre, Validators.required),
      email: new FormControl(this.usuario.email, [Validators.required, Validators.email]),
      contrasenia: new FormControl(this.usuario.contrasenia, Validators.required),
      fechaNacimiento: new FormControl(this.usuario.fechaNacimiento, Validators.required)
    });
  }

  ngOnInit(): void {

    const userData = this.authService.getData();
    console.log(userData.idusuario);
    this.userService.getOneUsuario(userData.idusuario).subscribe((data: IUser) => {
      console.log(data);
      this.usuario = data;
      console.log(this.usuario.idusuario);
    });


    this.formulario = new FormGroup({
      nombre: new FormControl(this.usuario.nombre, Validators.required),
      email: new FormControl(this.usuario.email, [Validators.required, Validators.email]),
      contrasenia: new FormControl(this.usuario.contrasenia, Validators.required),
      fechaNacimiento: new FormControl(this.usuario.fechaNacimiento, Validators.required)
    });
  }

  logOut(){
    this.authService.logout();
    this.router.navigate(['/login']);
    window.location.reload();
  }

  eliminarPerfil(): void {
    console.log(this.usuario.idusuario);
    this.userService.deleteUsuario(this.usuario.idusuario).subscribe(() => {
      console.log('Perfil eliminado con éxito');
    });
    this.authService.logout();
    this.router.navigate(['/login']);
    window.location.reload();
  }

  modificarPerfil(): void {
    this.modificar = true;
  }

  cancelar(): void {
    this.modificar = false;
  }

  guardar(): void {
    if (this.formulario) {
      const usuarioActualizado: IUser = {
        idusuario: this.usuario.idusuario,
        nombre: this.formulario.get('nombre')?.value,
        email: this.formulario.get('email')?.value,
        contrasenia: this.formulario.get('contrasenia')?.value,
        fechaNacimiento: this.formulario.get('fechaNacimiento')?.value,
      };
      console.log(usuarioActualizado);
      this.userService.updateUsuario(usuarioActualizado).subscribe(() => {
        console.log('Perfil actualizado con éxito');
        this.modificar = false;
      });
    }
  }
}
