import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgModule } from '@angular/core';
import { Injectable } from '@angular/core';
import { IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})

export class PeliService {

  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Accept': 'application/json',
    })
  };
  // en vez de localhost poner la ip de la maquina
  private BASE_URL = 'http://localhost:3000/pelicula';

  constructor(private http: HttpClient) { }

  getOnePelicula(id: number): Observable<any> {
    return this.http.get(`${this.BASE_URL}` + `/${id}`, this.httpOptions);
  }

  getPeliculas(): Observable<any> {
    return this.http.get(`${this.BASE_URL}`, this.httpOptions);  // Devuelve todas las películas sin paginación
  }

  getPeliculasPaginadas(page: number): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}?page=${page}`);
  }
  addPelicula(pelicula: any): Observable<void> {
    console.log(pelicula);
    return this.http.post<void>(`${this.BASE_URL}`, pelicula, this.httpOptions);
  }

  deletePelicula(id: number): Observable<void> {
    return this.http.delete<void>(`${this.BASE_URL}/${id}`, this.httpOptions);
  }
}