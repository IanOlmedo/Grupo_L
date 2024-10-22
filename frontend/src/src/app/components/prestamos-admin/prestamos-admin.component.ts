import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-prestamos-admin',
  templateUrl: './prestamos-admin.component.html',
  styleUrl: './prestamos-admin.component.css'
})
export class PrestamosAdminComponent {
  rol = localStorage.getItem('user_role');


  constructor(
    private route: ActivatedRoute
  ){}


  get isToken() {
    return localStorage.getItem('token');
  }  

  get isRole() {
    return localStorage.getItem('user_role');
  }  

  get isAdmin() {

    return localStorage.getItem('user_role') === 'admin';
  }
  
}
