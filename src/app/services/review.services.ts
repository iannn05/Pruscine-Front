import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgModule } from '@angular/core';
import { Injectable } from '@angular/core';
import { IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})

export class ReviewService {

  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Accept': 'application/json',
      'authorization': localStorage.getItem('token')!
    })
  };

  private BASE_URL = 'http://172.18.0.1:3000/resena';

  constructor(private http: HttpClient) { }

  getOneReview(id: number): Observable<any> {
    return this.http.get(`${this.BASE_URL}` + `/${id}`, this.httpOptions);
  }

  getReviews(): Observable<any> {
    return this.http.get(`${this.BASE_URL}`, this.httpOptions);
  }

  addReview(review: any, idusuario: number): Observable<void> {
    const body = { ...review, idusuario }; // Combina el review con el idusuario
    console.log("review y usuario");
    console.log(body);
    return this.http.post<void>(`${this.BASE_URL}`, body, this.httpOptions);
  }

  deleteReview(id: number): Observable<void> {
    return this.http.delete<void>(`${this.BASE_URL}/${id}`, this.httpOptions);
  }
}
