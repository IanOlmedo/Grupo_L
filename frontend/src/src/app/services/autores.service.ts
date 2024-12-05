import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

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

  getOneAutor(id:string){
  let headers = new HttpHeaders({
    'Content-Type': 'application/json'
  })

  const requestOptions = {headers: headers}
  return this.httpClient.get<any>(this.url + '/Autor/'+id, requestOptions)
  }

  createAutor(autor: any): Observable<any> {
    let auth_token = localStorage.getItem('token');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    const requestOptions = { headers: headers };
    return this.httpClient.post(this.url + '/Autores', autor, requestOptions);
  }

  updateAutor(id: string, autor: any): Observable<any> {
    let auth_token = localStorage.getItem('token');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    const requestOptions = { headers: headers };
    return this.httpClient.put(this.url + '/Autor/' + id, autor, requestOptions);
  }

  deleteAutor(id: string): Observable<any> {
    let auth_token = localStorage.getItem('token');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    const requestOptions = { headers: headers };
    return this.httpClient.delete(this.url + '/Autor/' + id, requestOptions);
  }
}
