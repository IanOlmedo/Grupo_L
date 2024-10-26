import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PrestamosService } from '../../services/prestamos.service';

@Component({
  selector: 'app-info-prestamo',
  templateUrl: './info-prestamo.component.html',
  styleUrl: './info-prestamo.component.css'
})
export class InfoPrestamoComponent implements OnInit {
  var_id!:string
  var_rol!:string
  prestamo: any;

  constructor(
    private route: ActivatedRoute,
    private prestamosService: PrestamosService
  ) { }

  ngOnInit(): void {
    this.var_id = this.route.snapshot.paramMap.get('id') || '';
    this.var_rol=this.route.snapshot.paramMap.get('rol') || '';
    this.getPrestamo();
  }

  getPrestamo(): void {
    const prestamoId = this.route.snapshot.paramMap.get('id'); // Obtén el ID del préstamo de la URL
    if (prestamoId !== null) {
      console.log(typeof(prestamoId))
      this.prestamosService.getOnePrestamos(prestamoId)
        .subscribe(prestamo => this.prestamo = prestamo);
    } else {
      console.error('prestamoId esta en Null'); // Manejar el caso en el que prestamoId es null, por ejemplo, redirigiendo a una página de error o mostrando un mensaje al usuario.
    }
  }
  
}