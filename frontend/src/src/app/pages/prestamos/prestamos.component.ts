import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PrestamosService } from '../../services/prestamos.service';

@Component({
  selector: 'app-prestamos',
  templateUrl: './prestamos.component.html',
  styleUrl: './prestamos.component.css'
})
export class PrestamosComponent {
  var_id!: string;
  var_rol!: string;

  arrayPrestamos: any[] = [];
  filteredPrestamosPadre: any[] = [];
  arrayPrestamosWithDetails: any[] = [];
  prestamos: any[] = [];

  searchQuery: string = '';
  currentPage: number = 1;
  totalPages: number = 1;
  itemsPerPage: number = 8;

  constructor(
    private route: ActivatedRoute,
    private prestamosService: PrestamosService,
  ) {}

  get isToken() {
    return localStorage.getItem('token');
  }

  ngOnInit() {
    this.var_id = this.route.snapshot.paramMap.get('id') || '';
    this.var_rol = this.route.snapshot.paramMap.get('rol') || '';
    //this.fetchPrestamos();
  }
  /*
  fetchPrestamos(page: number = 1): void {
    const params = {
      page: page.toString(),
      per_page: this.itemsPerPage.toString()
    };

    this.prestamosService.getPrestamos(params).subscribe((rta: any) => {
      console.log('prestamos api: ', rta);
      this.arrayPrestamos = rta.prestamos || [];
      this.arrayPrestamosWithDetails = this.arrayPrestamos.map((prestamo: any) => ({
        prestamo: prestamo,
        usuario: prestamo.usuarios,
        libro: prestamo.libro
      }));
      this.prestamos = [...this.arrayPrestamosWithDetails];
    });
  }
    */

  get isRole() {
    return localStorage.getItem('user_role');
  }

  get isUser() {
    return localStorage.getItem('user_role') === 'user';
  }

  get isAdmin() {
    return localStorage.getItem('user_role') === 'admin';
  }

  searchQueryChange(query:string){
    this.searchQuery = query;
    console.log("Query: "+this.searchQuery)
  }

  /*
  onUserSearchQueryChange(searchQuery: string): void {
    this.searchQuery = searchQuery;
    this.filterPrestamosUser();
  }

  onBookSearchQueryChange(searchQuery: string): void {
    this.searchQuery = searchQuery;
    this.filterPrestamosBook();
  }

  filterPrestamosUser(): void {
    if (this.searchQuery.trim() === '') {
      this.prestamos = [...this.arrayPrestamosWithDetails]; // Restablecer si no hay búsqueda
    } else {
      this.prestamos = this.arrayPrestamosWithDetails.filter(prestamo =>
        prestamo.usuario.nombre_completo.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }

  filterPrestamosBook(): void {
    if (this.searchQuery.trim() === '') {
      this.prestamos = [...this.arrayPrestamosWithDetails]; // Restablecer si no hay búsqueda
    } else {
      this.prestamos = this.arrayPrestamosWithDetails.filter(prestamo =>
        prestamo.libro.titulo.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }
  */
}
