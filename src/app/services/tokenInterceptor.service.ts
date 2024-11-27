import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (typeof window !== 'undefined' && window.localStorage) {
      const token = localStorage.getItem("token");
      
      if (token) {
        const clonedRequest = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
        return next.handle(clonedRequest);
      }
    }

  
    return next.handle(req);
  }
}
