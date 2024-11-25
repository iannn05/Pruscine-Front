import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgModule } from '@angular/core';
import { Injectable } from '@angular/core';
import { IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})

export class GeneroService {

  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Accept': 'application/json',
      'authorization': localStorage.getItem('token')!
    })
  };

  private BASE_URL = 'http://localhost:3000/genero';

  constructor(private http: HttpClient) { }

  getOneGenero(id: number): Observable<any> {
    return this.http.get(`${this.BASE_URL}` + `/${id}`, this.httpOptions);
  }

  getGeneros(): Observable<any> {
    return this.http.get(`${this.BASE_URL}`, this.httpOptions);
  }

  addGenero(genero: any): Observable<void> {
    console.log("tercer log: " + JSON.stringify(genero));
    return this.http.post<void>(`${this.BASE_URL}`, {genero}, this.httpOptions);
  }

  deleteGenero(id: number): Observable<void> {
    return this.http.delete<void>(`${this.BASE_URL}/${id}`, this.httpOptions);
  }
}