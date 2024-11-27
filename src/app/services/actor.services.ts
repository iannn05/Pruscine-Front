import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActorService {
  private BASE_URL = 'http://localhost:3000/actor';

  constructor(private http: HttpClient) {}

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

  getOneActor(id: number): Observable<any> {
    return this.http.get(`${this.BASE_URL}/${id}`, this.getHttpOptions());
  }

  getActores(): Observable<any[]> {
    return this.http.get<any[]>(`${this.BASE_URL}`, this.getHttpOptions());
  }

  addActor(actor: any): Observable<void> {
    console.log(actor);
    return this.http.post<void>(`${this.BASE_URL}`, {actor}, this.getHttpOptions());
  }

  deleteActor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.BASE_URL}/${id}`, this.getHttpOptions());
  }
}