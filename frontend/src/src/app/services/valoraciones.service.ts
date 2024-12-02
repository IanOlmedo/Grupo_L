import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Router } from '@angular/router';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValoracionesService {
  url = '/api';

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    ) { }

  getValoraciones(params:any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    let httpParams = new HttpParams();

    Object.keys(params).forEach(key => {
      if (params[key]) {
        httpParams = httpParams.append(key, params[key]);
      }
    });

    const requestOptions = { headers: headers, params: httpParams };
    return this.httpClient.get<any>(this.url + '/Valoracion', requestOptions);
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
