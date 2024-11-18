import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  url = '/api'
  constructor(
    private httpClient:HttpClient
  ) { }

  getBooks(params: any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    let httpParams = new HttpParams();
    Object.keys(params).forEach(key => {
      if (params[key]) {
        httpParams = httpParams.append(key, params[key]);
      }
    });

    const requestOptions = { headers: headers, params: httpParams };
    return this.httpClient.get<any>(`${this.url}/Libros`, requestOptions);
  }
  
  getOneBook(id: string){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })

    const requestOptions = {headers: headers}
    return this.httpClient.get<any>(this.url + '/Libro/'+id, requestOptions)
  }

  createBook(book: any): Observable<any> {
    console.log(book)
    let auth_token = localStorage.getItem('token');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    const requestOptions = { headers: headers };
    return this.httpClient.post(this.url + '/Libros', book, requestOptions);
  }

  updateBook(id:string, book: any): Observable<any> {
    let auth_token = localStorage.getItem('token');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    const requestOptions = { headers: headers };
    return this.httpClient.put(this.url + '/Libro/' + id, book, requestOptions);
  }

  deleteBook(id: string): Observable<any> {
    let auth_token = localStorage.getItem('token');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    const requestOptions = { headers: headers };
    console.log('Sending DELETE request for book with ID:', id);
    return this.httpClient.delete(this.url + '/Libro/' + id, requestOptions);
  }

}
