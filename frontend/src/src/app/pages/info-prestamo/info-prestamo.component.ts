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

  loan: any = {
    id_prestamo: '',
    fecha_de_entrega: '',
    fecha_de_vencimiento: '',
    estado: ''
  };

  loanOptions: any[] = []

  stateOptions = [
    {value: 'devuelto', label: 'Devuelto'},
    {value: 'no devuelto', label: 'No devuelto'}
  ]

  arrayPrestamos: any[] = [];
  user:any;

  constructor(
    private route: ActivatedRoute,
    private prestamosService: PrestamosService,
    private usuarioService: UsuariosService,
  ) { }

  ngOnInit(): void {
    this.var_id = this.route.snapshot.paramMap.get('id') || '';
    this.checkPrestamosUser(this.var_id);
    this.getUser(this.var_id);
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
        this.populateLoanOptions();
    });
}

getUser(id:string): void{
  this.usuarioService.getOneUser(id).subscribe((rta:any)=>{
    console.log("usuario: ",rta)
    this.user = rta
  })
}

populateLoanOptions(): void{
  this.arrayPrestamos.forEach((loan: any) =>{
    this.loanOptions.push({
      value : loan.id_prestamo,
      label: loan.libro.titulo
    });
  });
}

onSubmitUpdate() {
  const temporal_prestamo = this.arrayPrestamos.filter((prestamo: any) => prestamo.id_prestamo === Number(this.loan.id_prestamo))
  const prestamoData = {
    id_usuario: Number(this.var_id),
    id_libro: temporal_prestamo[0].libro.id_libro,
    fecha_de_entrega: this.loan.fecha_de_entrega,
    fecha_de_vencimiento: this.loan.fecha_de_vencimiento,
    estado: this.loan.estado,
  };

  console.log("Resultado: ", prestamoData)
  this.prestamosService.updatePrestamo(this.loan.id_prestamo, prestamoData).subscribe(
    response => {
      console.log('Prestamo actualizado con éxito:', response);
      alert('Se actualizo el prestamo correctamente');
    },
    error => {
      console.error('Error al actualizar el préstamo:', error);
      alert('Hubo un error al actualizar el prestamo. Por favor, inténtelo de nuevo más tarde')
    }
  );
}

onSubmitDelete(){
  const numeroPrestamo = this.loan.numeroPrestamo -1
  const id = this.arrayPrestamos[numeroPrestamo].id_prestamo 
  console.log("Id: ",id.toString())
  this.prestamosService.deletePrestamo(id.toString())
}
}