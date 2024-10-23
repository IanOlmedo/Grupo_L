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
    let auth_token = localStorage.getItem('token');

    let headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${auth_token}`})

    const requestOptions = {headers: headers}
    
    return this.httpClient.get<any>(this.url + '/Prestamos', requestOptions)
  }

  getOnePrestamos(id:string){
    let auth_token = localStorage.getItem('token');

    let headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${auth_token}`})

    const requestOptions = {headers: headers}
    return this.httpClient.get<any>(this.url + '/Prestamo/'+id, requestOptions)
  }
}