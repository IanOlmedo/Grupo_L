import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pres-admin',
  templateUrl: './pres-admin.component.html',
  styleUrl: './pres-admin.component.css'
})
export class PresAdminComponent {



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
    return this.isRole == 'user';
  }

  get isAdmin() {
    return this.isRole == 'admin';
  }
}



