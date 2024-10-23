import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-prestamos-user',
  templateUrl: './prestamos-user.component.html',
  styleUrl: './prestamos-user.component.css'
})
export class PrestamosUserComponent {
  rol = localStorage.getItem('user_role');
  id = localStorage.getItem('user_id')

  @Input() filteredPrestamos: any[] = [] 


  constructor(
    private route: ActivatedRoute,

  ){}
  /*
  get prestamosUsuario(){
    console.log("Usuario: "+this.id)
    console.log("id_usuario: "+this.filteredPrestamos.prestamos)
    console.log("Prestamos del usuario: "+this.filteredPrestamos.filter(p => p.id_usuario === this.id))
    return this.filteredPrestamos.filter(p => p.id_usuario === this.id)
  }
  */
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
