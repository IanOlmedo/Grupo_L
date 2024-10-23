import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-prestamos-admin',
  templateUrl: './prestamos-admin.component.html',
  styleUrl: './prestamos-admin.component.css'
})
export class PrestamosAdminComponent {
  rol = localStorage.getItem('user_role');
  id = localStorage.getItem('user_id')

  cantidadPrestamos: number = 0;
  cantidadPrestamosVencidos: number = 0;
  /*
  @Input() var_rol!: string;
  @Input() var_id!: string;
  */

  @Input() filteredPrestamos: any[] = [] 
  @Input() arrayBooks: any[] = [] 
  @Input() arrayUsers: any[] = [] 

  constructor(
    private route: ActivatedRoute
  ){}

  ngOnInit(){
    this.cantidadPrestamos = this.countPrestamosByUser();
    this.cantidadPrestamosVencidos = this.countPrestamosVencidosByUser(6)
  }

  countPrestamosByUser(){
    return this.filteredPrestamos.reduce((count, prestamo) => {
      if (prestamo.id_usuario === this.id) {
        return count + 1;
      } else {
        return count;
      }
    }, 0);
  }

  countPrestamosVencidosByUser(id_usuario: number): number {
    const fechaActual = new Date();
    return this.filteredPrestamos.reduce((count, prestamo) => {
      if (prestamo.id_usuario === id_usuario && new Date(prestamo.fecha_de_vencimiento) < fechaActual) {
        return count + 1;
      } else {
        return count;
      }
    }, 0);
  }


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
