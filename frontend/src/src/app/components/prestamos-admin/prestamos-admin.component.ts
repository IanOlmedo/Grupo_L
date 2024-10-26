import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-prestamos-admin',
  templateUrl: './prestamos-admin.component.html',
  styleUrl: './prestamos-admin.component.css'
})
export class PrestamosAdminComponent {
  cantidadPrestamos: number = 0;
  cantidadPrestamosVencidos: number = 0;


  @Input() set arrayPrestamosWithDetails(value: any[]) {
    if (value) {
      this.originalPrestamos = [...value]
      this.uniqueUsersArray = [...new Set(value.map(prestamo => prestamo.usuario.id_usuario))];
      this.uniquePrestamos = this.uniqueUsersArray.reduce((acc, userId) => {
        const userPrestamos = value.filter(prestamo => prestamo.usuario.id_usuario === userId);
        if (userPrestamos.length > 0) {
          acc.push(userPrestamos[0]);
        }
        return acc;
      }, []);
    }
  }
  uniqueUsersArray: any[] = [];
  uniquePrestamos: any[] = [];
  originalPrestamos: any[] = [];

  constructor(
    private route: ActivatedRoute
  ){}

  ngOnInit(){}

  countPrestamosByUser(userId: string) {
    return this.originalPrestamos.reduce((count, prestamo) => {
      if (prestamo.usuario.id_usuario === userId) {
        return count + 1;
      } else {
        return count;
      }
    }, 0);
  }

  countPrestamosVencidosByUser(userId: number): number {
    const fechaActual = new Date();
    return this.originalPrestamos.reduce((count, prestamo) => {
      const fechaVencimiento = prestamo.prestamo.fecha_de_vencimiento.split("-").reverse().join("-");
      const date = new Date(fechaVencimiento);
      if (prestamo.usuario.id_usuario === userId && date < fechaActual && prestamo.prestamo.estado === "no devuelto") {
        return count + 1;
      } else {
        return count;
      }
    }, 0);
  }
  
}
