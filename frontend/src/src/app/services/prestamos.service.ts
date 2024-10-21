import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PrestamosService {
  url = '/api';

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  getPrestamos(){
    let headers = new HttpHeaders({
    'Content-Type': 'application/json'
  })

  const requestOptions = {headers: headers}
  return this.httpClient.get<any>(this.url + '/Prestamos', requestOptions)
  }

  getOnePrestamos(){
    let headers = new HttpHeaders({
    'Content-Type': 'application/json'
  })

  const requestOptions = {headers: headers}
  return this.httpClient.get<any>(this.url + '/Prestamo', requestOptions)
  }
}