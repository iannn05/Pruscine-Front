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

export class ListaService {

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  private getHttpOptions() {
    let headers = new HttpHeaders();

    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      }
    }

    return { headers };
  }
  
  // en vez de localhost poner la ip de la maquina
  private BASE_URL = 'http://localhost:3000/lista';


  getOneLista(id: number): Observable<any> {
    return this.http.get(`${this.BASE_URL}` + `/${id}`, this.getHttpOptions());
  }

  getListas(): Observable<any> {
    return this.http.get(`${this.BASE_URL}`, this.getHttpOptions());
  }

  getListasPaginadas(page: number): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}?page=${page}`);
  }

  getListasUsuario(idusuario: number): Observable<any> {
    return this.http.get(`${this.BASE_URL}/usuario/${idusuario}`, this.getHttpOptions());
  }

  addLista(lista: any, idusuario: number): Observable<void> {
    const body = { ...lista, idusuario };
    console.log("lista y usuario");
    console.log(body);
    return this.http.post<void>(`${this.BASE_URL}`, body, this.getHttpOptions());
  }

  deleteLista(id: number): Observable<void> {
    return this.http.delete<void>(`${this.BASE_URL}/${id}`, this.getHttpOptions());
  }
}