import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inject, NgModule, PLATFORM_ID } from '@angular/core';
import { Injectable } from '@angular/core';
import { IUser } from '../models/user.model';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {
    
   }

  private getHttpOptions() {
    let headers = new HttpHeaders();

    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      console.log(token);
      if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      }
    }
    
    return { headers };
  }
  // en vez de localhost poner la ip de la maquina
  private BASE_URL = 'http://localhost:3000/usuario';

  

  getOneUsuario(id: number): Observable<any> {
    return this.http.get(`${this.BASE_URL}` + `/${id}`, this.getHttpOptions());
  }

  getUsuarios(): Observable<any> {
    return this.http.get(`${this.BASE_URL}`, this.getHttpOptions());
  }

  addUsuario(usuario: any): Observable<void> {
    console.log(usuario);
    return this.http.post<void>(`${this.BASE_URL}`, usuario, this.getHttpOptions());
  }

  updateUsuario(usuario: IUser): Observable<void> {
    const httpoptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept': 'application/json',
        'authorization': localStorage.getItem('token')!
      })
    };
    return this.http.put<void>(`${this.BASE_URL}/${usuario.idusuario}`, JSON.stringify(usuario), httpoptions);
  }

  deleteUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.BASE_URL}/${id}`, this.getHttpOptions());
  }
}