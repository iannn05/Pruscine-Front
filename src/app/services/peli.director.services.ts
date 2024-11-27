import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgModule } from '@angular/core';
import { Injectable } from '@angular/core';
import { IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})

export class PeliDirectorService {

  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Accept': 'application/json',
    })
  };

  private BASE_URL = 'http://localhost:3000/peliculaDirector';

  constructor(private http: HttpClient) { }

  getDirectores(id: number): Observable<any> {
    return this.http.get(`${this.BASE_URL}` + `/${id}`, this.httpOptions);
  }

}