import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, take } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = '/api';
  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }


  login(dataLogin:any): Observable<any> {
    
    return this.httpClient.post(this.url+'/auth/login',dataLogin).pipe(take(1));
  }
 


  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_role');
    this.router.navigateByUrl('home');
  }

  register(dataRegister: any): Observable<any> {
    const body = {
      direccion: null,
      dni: null,
      email: dataRegister.email, // Solo asigna el email proporcionado
      id_usuario: null,
      nombre_completo: null,
      password: dataRegister.password, // Solo asigna la contraseña proporcionada
      rol: 'user', // Puedes asignar un valor predeterminado para el rol si es necesario
      telefono: null
    };
  
    return this.httpClient.post(this.url + '/auth/register', body).pipe(take(1));
  }
  
}