import { Component, Input, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  user_id = localStorage.getItem('user_id')

  constructor(
    private authService: AuthService
  ) {}

  get isToken() {
    return localStorage.getItem('token');
  }
  
  get isUser() {
    return localStorage.getItem('user_role') === 'users';
  }

  get isAdmin() {
    return localStorage.getItem('user_role') === 'admin';
  }

  get isBiblo(){
    return localStorage.getItem('user_role') === 'biblo';
  }

  cerrarSesion() {
    this.authService.logout();
  }
}