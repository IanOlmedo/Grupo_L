import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-prestamos-user',
  templateUrl: './prestamos-user.component.html',
  styleUrl: './prestamos-user.component.css'
})
export class PrestamosUserComponent {
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

  get isUser() {
    return localStorage.getItem('user_role') === 'user';
  }

}
