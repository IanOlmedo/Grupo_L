import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AutoresService {
  url = '/api';

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  getAutores(){
    let headers = new HttpHeaders({
    'Content-Type': 'application/json'
  })

  const requestOptions = {headers: headers}
  return this.httpClient.get<any>(this.url + '/Autores', requestOptions)
  }

  getOnePrestamo(){
    let headers = new HttpHeaders({
    'Content-Type': 'application/json'
  })

  const requestOptions = {headers: headers}
  return this.httpClient.get<any>(this.url + '/Autor', requestOptions)
  }
}
