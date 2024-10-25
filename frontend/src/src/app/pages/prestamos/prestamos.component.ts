import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router'
import { PrestamosService } from '../../services/prestamos.service'

@Component({
  selector: 'app-prestamos',
  templateUrl: './prestamos.component.html',
  styleUrl: './prestamos.component.css'
})
export class PrestamosComponent {
  var_id!:string
  var_rol!:string

  arrayPrestamos:any[] = []
  filteredPrestamos:any[] = []
  arrayPrestamosWithDetails:any[] = []
  arrayUsers:any[] = []
  arrayBooks:any[] = []



  prestamo:any
  user:any
  book:any

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private prestamosService: PrestamosService,
  ){}

  get isToken() {
    return localStorage.getItem('token');
  }  

  ngOnInit(){
    this.var_id = this.route.snapshot.paramMap.get('id') || '';
    this.var_rol=this.route.snapshot.paramMap.get('rol') || '';

    console.log('this.var_id: ',this.var_id);
    console.log('this.var_rol: ',this.var_rol);
    this.prestamosService.getPrestamos().subscribe((rta:any) => {
      console.log('prestamos api: ',rta);
      this.arrayPrestamos = rta.prestamos || [];
      this.filteredPrestamos = [...this.arrayPrestamos]
      this.arrayPrestamosWithDetails = this.arrayPrestamos.map((prestamo: any) => {
        return {
          prestamo: prestamo,
          usuario: prestamo.usuarios,
          libro: prestamo.libro
        };
      });
      for (let element of this.arrayPrestamosWithDetails) {
        console.log(element);
      }
    });
    if (this.var_id){
      this.prestamosService.getOnePrestamos(this.var_id).subscribe((rta:any) =>{
        console.log("usuarios: "+rta.usuarios)
        console.log("libros: "+rta.libro)
        this.prestamo = rta || null
        this.user = rta.usuarios
        this.book = rta.libro
      })
    }else{
      console.log("No hay ID")
    }
  }

  get isRole() {
    return localStorage.getItem('user_role');
  }  

  get isUser() {
    return localStorage.getItem('user_role') === 'user';
  }

  get isAdmin() {
    return localStorage.getItem('user_role') === 'admin';
  }

  buscar(searchQuery:string) {
    console.log('buscar: ', searchQuery);
    this.filteredPrestamos = this.arrayPrestamos.filter(p => p.usuarios.nombre_completo.includes(searchQuery));
  }
}
