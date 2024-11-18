import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Router } from '@angular/router';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrestamosService {
  url = '/api';

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  getPrestamos(params:any): Observable<any> {
    let auth_token = localStorage.getItem('token');
  
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });

    let httpParams = new HttpParams();
    Object.keys(params).forEach(key => {
      if (params[key]) {
        httpParams = httpParams.append(key, params[key]);
      }
    });
  
    const requestOptions = { headers: headers, params: httpParams };
    return this.httpClient.get<any>(this.url + '/Prestamos', requestOptions);
  }
  
  getOnePrestamos(id:string){
    let auth_token = localStorage.getItem('token');

    let headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${auth_token}`})

    const requestOptions = {headers: headers}
    return this.httpClient.get<any>(this.url + '/Prestamo/'+id, requestOptions)
  }

  createPrestamo(prestamo: any): Observable<any> {
    console.log(prestamo)
    let auth_token = localStorage.getItem('token');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    const requestOptions = { headers: headers };
    return this.httpClient.post(this.url + '/Prestamos', prestamo, requestOptions);
  }

  updateBook(id:string, prestamo: any): Observable<any> {
    let auth_token = localStorage.getItem('token');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    const requestOptions = { headers: headers };
    return this.httpClient.put(this.url + '/Prestamo/' + id, prestamo, requestOptions);
  }

  deletePrestamo(id: string): Observable<any> {
    let auth_token = localStorage.getItem('token');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    const requestOptions = { headers: headers };
    console.log('Sending DELETE request for book with ID:', id);
    return this.httpClient.delete(this.url + '/Libro/' + id, requestOptions);
  }
}