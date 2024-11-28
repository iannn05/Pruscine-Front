import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneroService {
  // en vez de localhost poner la ip de la maquina
  private BASE_URL = 'http://172.18.0.1:3000/genero';

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

  getOneGenero(id: number): Observable<any> {
    return this.http.get(`${this.BASE_URL}/${id}`, this.getHttpOptions());
  }

  getGeneros(): Observable<any[]> {
    return this.http.get<any[]>(`${this.BASE_URL}`, this.getHttpOptions());
  }

  addGenero(genero: any): Observable<void> {
    console.log("tercer log: " + JSON.stringify(genero));
    return this.http.post<void>(`${this.BASE_URL}`, { genero }, this.getHttpOptions());
  }

  deleteGenero(id: number): Observable<void> {
    return this.http.delete<void>(`${this.BASE_URL}/${id}`, this.getHttpOptions());
  }
}
