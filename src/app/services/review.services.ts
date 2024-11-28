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

export class ReviewService {
  // en vez de localhost poner la ip de la maquina
  private BASE_URL = 'http://172.18.0.1:3000/resena';

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

  getOneReview(id: number): Observable<any> {
    return this.http.get(`${this.BASE_URL}` + `/${id}`, this.getHttpOptions());
  }

  getReviews(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.BASE_URL}` + `/${id}`, this.getHttpOptions());
  }

  addReview(review: any, idusuario: number): Observable<void> {
    const body = { ...review, idusuario };
    console.log("review y usuario");
    console.log(body);
    return this.http.post<void>(`${this.BASE_URL}`, body, this.getHttpOptions());
  }

  deleteReview(id_pelicula: number, id_usuario: number): Observable<void> {
    const body = { id_pelicula, id_usuario };
    console.log(body);
    return this.http.delete<void>(`${this.BASE_URL}/reviews`, {
      body: body,
      headers: this.getHttpOptions().headers,
    });
  }
}