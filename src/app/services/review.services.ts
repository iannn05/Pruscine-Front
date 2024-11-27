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
    })
  };

  private BASE_URL = 'http://localhost:3000/resena';

  constructor(private http: HttpClient) { }

  getOneReview(id: number): Observable<any> {
    return this.http.get(`${this.BASE_URL}` + `/${id}`, this.httpOptions);
  }

  getReviews(): Observable<any> {
    return this.http.get(`${this.BASE_URL}`, this.httpOptions);
  }

  addReview(review: any): Observable<void> {
    console.log(review);
    return this.http.post<void>(`${this.BASE_URL}`, review, this.httpOptions);
  }

  deleteReview(id: number): Observable<void> {
    return this.http.delete<void>(`${this.BASE_URL}/${id}`, this.httpOptions);
  }
}