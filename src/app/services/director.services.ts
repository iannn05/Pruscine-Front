import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgModule } from '@angular/core';
import { Injectable } from '@angular/core';
import { IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})

export class DirectorService {

  private getHttpOptions() {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...(token && { 'authorization': token })
      })
    };
  }
  // en vez de localhost poner la ip de la maquina
  private BASE_URL = 'http://localhost:3000/director';

  constructor(private http: HttpClient) { }

  getOneDirector(id: number): Observable<any> {
    return this.http.get(`${this.BASE_URL}` + `/${id}`, this.getHttpOptions());
  }

  getDirectores(): Observable<any> {
    return this.http.get(`${this.BASE_URL}`, this.getHttpOptions());
  }

  addDirector(director: any): Observable<void> {
    console.log(director);
    return this.http.post<void>(`${this.BASE_URL}`, {director}, this.getHttpOptions());
  }

  deleteDirector(id: number): Observable<void> {
    return this.http.delete<void>(`${this.BASE_URL}/${id}`, this.getHttpOptions());
  }
}