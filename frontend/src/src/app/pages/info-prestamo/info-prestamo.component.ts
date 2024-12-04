import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PrestamosService } from '../../services/prestamos.service';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-info-prestamo',
  templateUrl: './info-prestamo.component.html',
  styleUrl: './info-prestamo.component.css'
})
export class InfoPrestamoComponent implements OnInit {
  var_id!:string
  prestamo: any;

  arrayPrestamos: any[] = [];
  user:any;

  constructor(
    private route: ActivatedRoute,
    private prestamosService: PrestamosService,
    private usuarioService: UsuariosService,
  ) { }

  ngOnInit(): void {
    this.var_id = this.route.snapshot.paramMap.get('id') || '';
    //this.getPrestamo();
    this.checkPrestamosUser(this.var_id);
    this.getUser(this.var_id);
    console.log("user: ",this.user)
    console.log("prestamo: ",this.prestamo)
    console.log("array: "+this.arrayPrestamos)
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

  checkPrestamosUser(id: string): void {
    this.prestamosService.getPrestamos({ id_usuario: id }).subscribe((rta: any) => {
        console.log("All prestamos: ", rta);
        this.prestamo = rta.prestamos || [];

        const userLoans = this.prestamo.filter((prestamo: any) =>
            prestamo.estado === 'no devuelto' || prestamo.estado === 'reservado'
        );

        console.log("Loans: ", userLoans);

        this.arrayPrestamos = [...userLoans];
        console.log("Array: ", this.arrayPrestamos);
    });
}

getUser(id:string): void{
  this.usuarioService.getOneUser(id).subscribe((rta:any)=>{
    console.log("usuario: ",rta)
    this.user = rta
  })
}

  
}