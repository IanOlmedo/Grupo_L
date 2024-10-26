import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-prestamos-user',
  templateUrl: './prestamos-user.component.html',
  styleUrl: './prestamos-user.component.css'
})
export class PrestamosUserComponent {
  var_id!:string

  @Input() arrayPrestamosWithDetails: any[] = [] 


  constructor(
    private route: ActivatedRoute,

  ){}

  ngOnInit(){
    this.var_id = this.route.snapshot.paramMap.get('id') || '';
  }

  getPrestamosPendientes() {    return this.arrayPrestamosWithDetails.filter(prestamo => {
      return prestamo.usuario.id_usuario === Number(this.var_id) && prestamo.prestamo.estado === 'no devuelto';
    });
  }

}
