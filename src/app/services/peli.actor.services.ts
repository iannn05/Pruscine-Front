import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgModule } from '@angular/core';
import { Injectable } from '@angular/core';
import { IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})

export class PeliActorService {

  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Accept': 'application/json',
    })
  };

  private BASE_URL = 'http://192.168.1.11:3000/peliculaActor';

  constructor(private http: HttpClient) { }

  getActores(id: number): Observable<any> {
    return this.http.get(`${this.BASE_URL}` + `/${id}`, this.httpOptions);
  }

}