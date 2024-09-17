import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }

  get(endpoint: string, params?: {[param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>}): Observable<any> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        httpParams = httpParams.set(key, params[key].toString());
      });
    }

    return this.http.get(`${this.apiUrl}/${endpoint}`, { 
      headers: this.getHeaders(),
      params: httpParams
    })
    .pipe(catchError(this.handleError));
  }

  post(endpoint: string, data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${endpoint}`, data, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  put(endpoint: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${endpoint}`, data, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  delete(endpoint: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${endpoint}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('Error HTTP:', error);
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente o de red
      console.error('Error:', error.error.message);
    } else {
      // El backend retornó un código de respuesta sin éxito.
      console.error(
        `Backend retornó código ${error.status}, ` +
        `body was: ${JSON.stringify(error.error)}`);
    }
    // Retorna un observable con un mensaje de error orientado al usuario
    return throwError(() => error);
  }
}