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
    localStorage.removeItem('cart');
    this.router.navigateByUrl('home');
  }

  register(dataRegister: any): Observable<any> {
    const body = {
      direccion: dataRegister.Direccion,
      dni: dataRegister.DNI,
      email: dataRegister.email, // Solo asigna el email proporcionado
      id_usuario: null,
      nombre_completo: dataRegister.Nombre,
      password: dataRegister.password, // Solo asigna la contraseña proporcionada
      rol: 'users', // Puedes asignar un valor predeterminado para el rol si es necesario
      telefono: dataRegister.Telefono,
      imagen: dataRegister.imagen,
    };
  
    return this.httpClient.post(this.url + '/auth/register', body).pipe(take(1));
  }

  verifyPassword(userId:string, password:string): Observable<any>{
    console.log("El id: ", userId)
    console.log('La contraseña: ', password)
    const body = {
      id_usuario: Number(userId),
      password: password,
    }
    return this.httpClient.post(this.url + '/auth/verify-password', body);
  }
  
}