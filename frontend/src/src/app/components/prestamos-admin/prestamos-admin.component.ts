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

  @Input() arrayPrestamosWithDetails: any[] = []

  constructor(
    private route: ActivatedRoute
  ){}

  ngOnInit(){

  }

  countPrestamosByUser(userId: string) {

    return this.arrayPrestamosWithDetails.reduce((count, prestamo) => {
      if (prestamo.usuario.id_usuario === userId) {
        return count + 1;
      } else {
        return count;
      }
    }, 0);
  }

  countPrestamosVencidosByUser(userId: number): number {
    const fechaActual = new Date();
    return this.arrayPrestamosWithDetails.reduce((count, prestamo) => {
      const fechaVencimiento = prestamo.prestamo.fecha_de_vencimiento.split("-").reverse().join("-");
      const date = new Date(fechaVencimiento);
      if (prestamo.usuario.id_usuario === userId && date < fechaActual && prestamo.prestamo.estado === "no devuelto") {
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
