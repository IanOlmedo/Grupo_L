import { Component, Input, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PrestamosService } from '../../services/prestamos.service';


@Component({
  selector: 'app-prestamos-user',
  templateUrl: './prestamos-user.component.html',
  styleUrl: './prestamos-user.component.css'
})
export class PrestamosUserComponent {
  var_id!:string
  id = localStorage.getItem('user_id')

  arrayPrestamos: any[] = []
  filteredPrestamos: any[] = []


  constructor(
    private route: ActivatedRoute,
    private prestamosService: PrestamosService,
  ){}

  ngOnInit(){
    this.var_id = this.route.snapshot.paramMap.get('id') || '';
    this.fetchPrestamos();
    console.log(this.arrayPrestamos)
  }

  getPrestamosPendientes() {    return this.arrayPrestamos.filter(prestamo => {
      return prestamo.estado === 'no devuelto' || prestamo.estado === "reservado";
    });
  }

  fetchPrestamos(): void {
    this.prestamosService.getPrestamos({id_usuario:Number(this.id)}).subscribe((rta: any) => {
      console.log('Prestamos api: ', rta);
      this.arrayPrestamos = rta.prestamos || [];
    });
  }

}
