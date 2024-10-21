import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ValoracionesService {
  url = '/api';

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  getValoraciones(){
    let headers = new HttpHeaders({
    'Content-Type': 'application/json'
  })

  const requestOptions = {headers: headers}
  return this.httpClient.get<any>(this.url + '/Valoraciones', requestOptions)
  }

  getOneValoracion(){
    let headers = new HttpHeaders({
    'Content-Type': 'application/json'
  })

  const requestOptions = {headers: headers}
  return this.httpClient.get<any>(this.url + '/Valoracion', requestOptions)
  }
}
