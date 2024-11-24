import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgModule } from '@angular/core';
import { Injectable } from '@angular/core';
import { IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})

export class ActorService {

  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Accept': 'application/json',
    })
  };

  private BASE_URL = 'http://localhost:3000/actor';

  constructor(private http: HttpClient) { }

  getOneActor(id: number): Observable<any> {
    return this.http.get(`${this.BASE_URL}` + `/${id}`, this.httpOptions);
  }

  getActores(): Observable<any> {
    return this.http.get(`${this.BASE_URL}`, this.httpOptions);
  }

  addActor(pelicula: any): Observable<void> {
    console.log(pelicula);
    return this.http.post<void>(`${this.BASE_URL}`, pelicula, this.httpOptions);
  }

  deleteActor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.BASE_URL}/${id}`, this.httpOptions);
  }
}