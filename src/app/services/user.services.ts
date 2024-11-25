import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgModule } from '@angular/core';
import { Injectable } from '@angular/core';
import { IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Accept': 'application/json',
    })
  };

  private BASE_URL = 'http://localhost:3000/usuario';

  constructor(private http: HttpClient) { }

  getOneUsuario(id: number): Observable<any> {
    return this.http.get(`${this.BASE_URL}` + `/${id}`, this.httpOptions);
  }

  getUsuarios(): Observable<any> {
    return this.http.get(`${this.BASE_URL}`, this.httpOptions);
  }

  addUsuario(usuario: any): Observable<void> {
    console.log(usuario);
    return this.http.post<void>(`${this.BASE_URL}`, usuario, this.httpOptions);
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
    return this.http.delete<void>(`${this.BASE_URL}/${id}`, this.httpOptions);
  }
}