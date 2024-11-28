import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgModule } from '@angular/core';
import { Injectable } from '@angular/core';
import { IUser } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string = '';

  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  };

  private BASE_URL = 'http://172.18.0.1:3000/auth';

  constructor(private http: HttpClient, private router: Router) { }

  getData() {
    if (typeof window !== 'undefined' && window.localStorage) {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const payload = token.split('.')[1];
                const decodedPayload = JSON.parse(atob(payload)); // Decodifica el payload
                console.log('Datos decodificados del token:', decodedPayload);
                return decodedPayload; // Devuelve los datos completos del token
            } catch (e) {
                console.error('Error al decodificar el token:', e);
                return null;
            }
        }
    }
    return null;
  }


  logUser(usuario: any): Observable<any> {
    console.log(usuario);
    return this.http.post(`${this.BASE_URL}`, usuario, this.httpOptions);
  }

  loggedIn(): boolean {

    if (typeof window !== 'undefined' && window.localStorage) {
      return !!localStorage.getItem('token');
    }
    return false;
  }

  logout() {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('token');
    }
    this.router.navigate(['/']);
  }
}
