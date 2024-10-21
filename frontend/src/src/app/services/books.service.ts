import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  url = '/api'
  constructor(
    private httpClient:HttpClient
  ) { }

  getBooks(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })

    const requestOptions = {headers: headers}
    return this.httpClient.get<any>(this.url + '/Libros', requestOptions)
  }

  getOneBook(id: string){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })

    const requestOptions = {headers: headers}
    return this.httpClient.get<any>(this.url + '/Libro/'+id, requestOptions)
  }
}
