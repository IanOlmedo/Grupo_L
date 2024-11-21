import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  url = '/api';
  constructor(
    private httpClient: HttpClient
  ) { }

  getOneUser(id: string){
    console.log("Este es el Id: " + id)
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })

    const requestOptions = {headers: headers}
    return this.httpClient.get<any>(this.url + '/Usuario/'+id, requestOptions)
  }
  getUsers(params: any): Observable<any> {
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
    return this.httpClient.get<any>(this.url + '/Usuarios', requestOptions);
  }

  getUserRole() {
    let id = localStorage.getItem('user_id');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const requestOptions = { headers: headers };
    this.httpClient.get<any>(this.url + '/Usuario/' + id, requestOptions)
      .subscribe(user => {
        localStorage.setItem('user_role', user.rol);
      });
  }

  createUser(user: any): Observable<any> {
    console.log(user);
    let auth_token = localStorage.getItem('token');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    const requestOptions = { headers: headers };
    return this.httpClient.post(this.url + '/Usuarios', user, requestOptions);
  }

  updateUser(id: string, user: any): Observable<any> {
    let auth_token = localStorage.getItem('token');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    const requestOptions = { headers: headers };
    return this.httpClient.put(this.url + '/Usuario/' + id, user, requestOptions);
  }

  deleteUser(id: string): Observable<any> {
    let auth_token = localStorage.getItem('token');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    const requestOptions = { headers: headers };
    return this.httpClient.delete(this.url + '/Usuario/' + id, requestOptions);
  }
}
