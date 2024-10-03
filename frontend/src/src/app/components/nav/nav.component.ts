import { Component, Input, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  @Input() var_rol!: string;
  
  @Input() var_id!: string;
  constructor(
    private authService: AuthService
  ) {}

  get isToken() {
    return localStorage.getItem('token');
  }  

  cerrarSesion() {
    this.authService.logout();
  }
}