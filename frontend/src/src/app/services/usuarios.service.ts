import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  url = '/api';
  constructor(
    private httpClient:HttpClient
  ) { }


  getUsers() {
    let auth_token = localStorage.getItem('token');

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}` 
    })

    const requestOptions = {headers: headers}

    return this.httpClient.get(this.url + '/Usuarios', requestOptions);
  }

  getUserRole(){
    let id = localStorage.getItem('user_id')

    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })

    const requestOptions = {headers: headers}
    this.httpClient.get<any>(this.url + '/Usuario/' + id, requestOptions)
      .subscribe(user => {
        localStorage.setItem('user_role',user.rol)
      })
  }
}