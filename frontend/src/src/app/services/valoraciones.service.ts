import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Router } from '@angular/router';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValoracionesService {
  url = '/api';

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  getValoraciones(page: number = 1): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  
    const requestOptions = { headers: headers, params: { page: page.toString() } };
    return this.httpClient.get<any>(this.url + '/Valoracion', requestOptions);
  }

  getOneValoracion(){
    let headers = new HttpHeaders({
    'Content-Type': 'application/json'
  })

  const requestOptions = {headers: headers}
  return this.httpClient.get<any>(this.url + '/Valoracion', requestOptions)
  }

  createValoracion(valoracion: any): Observable<any> {
    console.log(valoracion);
    let auth_token = localStorage.getItem('token');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    const requestOptions = { headers: headers };
    return this.httpClient.post(this.url + '/Valoracion', valoracion, requestOptions);
  }

}
