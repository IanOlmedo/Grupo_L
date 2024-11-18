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
  prestamos:any[] = []
  arrayUsers:any[] = []
  arrayBooks:any[] = []


  searchQuery: string = ''
  prestamo:any
  user:any
  book:any

  currentPage: number = 1;
  totalPages: number = 1;
  itemsPerPage: number = 8;

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

    this.fetchPrestamos();
  }

  fetchPrestamos(page: number = 1): void{
    const params = {
      page: page.toString(),
      per_page: this.itemsPerPage.toString()
    };

    this.prestamosService.getPrestamos(params).subscribe((rta:any) => {
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
      this.prestamos = [...this.arrayPrestamosWithDetails]
      console.log("xd"+this.prestamos)
    });

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

  onSearchQueryChange(searchQuery: string) {
    this.searchQuery = searchQuery;
    this.buscar();
  }

  buscar() {
    this.prestamos = this.arrayPrestamosWithDetails.filter(p => p.usuario.nombre_completo.includes(this.searchQuery));
  }
}
