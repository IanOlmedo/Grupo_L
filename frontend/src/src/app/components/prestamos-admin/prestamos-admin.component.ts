import { Component, Input, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PrestamosService } from '../../services/prestamos.service';

@Component({
  selector: 'app-prestamos-admin',
  templateUrl: './prestamos-admin.component.html',
  styleUrl: './prestamos-admin.component.css'
})
export class PrestamosAdminComponent {
  cantidadPrestamos: number = 0;
  cantidadPrestamosVencidos: number = 0;

  @Input() searchQuery = '';

  arrayPrestamos: any[] = []
  filteredPrestamos: any[] = []
  paginatedPrestamos: any[] = []
  currentPage: number = 1 // Página actual
  totalPages: number = 1 // Total de páginas
  itemsPerPage: number = 5 // Cantidad de Prestamos por página
  uniqueUsersArray: any[] = [];
  uniqueUserPrestamos: any[] = [];
  originalPrestamos: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private prestamosService: PrestamosService
  ){}

  ngOnInit() {
    this.fetchPrestamos();
  }

  ngOnChanges(changes:SimpleChanges){
    if (changes['searchQuery']){
      this.filterPrestamos();
    }
  }

  fetchPrestamos(page: number = 1): void {
    const params = {
      page: page.toString(),
      per_page: this.itemsPerPage.toString()
    };
    this.prestamosService.getPrestamos(params).subscribe((rta: any) => {
      console.log('Prestamos api: ', rta);
      this.arrayPrestamos = rta.prestamos || [];
      this.filterPrestamos(); // Actualiza filteredBooks al obtener los libros
      this.originalPrestamos = [...this.arrayPrestamos]
      this.uniqueUsersArray = [...new Set(this.arrayPrestamos.map(prestamo => prestamo.usuarios.id_usuario))];
      this.uniqueUserPrestamos = this.uniqueUsersArray.map(userId => {
        return this.arrayPrestamos.find(prestamo => prestamo.usuarios.id_usuario === userId);
      });
      this.currentPage = rta.pagina;
      this.totalPages = rta.paginas;
      console.log("Filtered Prestamos", this.filteredPrestamos)
    });
  }

  filterPrestamos(): void {
    if (this.searchQuery.trim() === '') {
      this.filteredPrestamos = [...this.arrayPrestamos];
    } else {
      this.filteredPrestamos = this.arrayPrestamos.filter(prestamo =>
        prestamo.usuarios.nombre_completo.toLowerCase().includes(this.searchQuery.toLowerCase()),
      );
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.fetchPrestamos(page); 
    }
  }

  countPrestamosByUser(userId: string) {
    console.log(this.originalPrestamos)
    return this.originalPrestamos.reduce((count, prestamo) => {
      if (prestamo.usuarios.id_usuario === userId) {
        return count + 1;
      } else {
        return count;
      }
    }, 0);
  }

  countPrestamosVencidosByUser(userId: number): number {
    const fechaActual = new Date();
    return this.originalPrestamos.reduce((count, prestamo) => {
      const fechaVencimiento = prestamo.fecha_de_vencimiento.split("-").reverse().join("-");
      const date = new Date(fechaVencimiento);
      if (prestamo.usuarios.id_usuario === userId && date < fechaActual && prestamo.estado === "no devuelto") {
        return count + 1;
      } else {
        return count;
      }
    }, 0);
  }

  get isRole() {
    return localStorage.getItem('user_role');
  }

  get isUser() {
    return localStorage.getItem('user_role') === 'users';
  }

  get isAdmin() {
    return localStorage.getItem('user_role') === 'admin';
  }
}