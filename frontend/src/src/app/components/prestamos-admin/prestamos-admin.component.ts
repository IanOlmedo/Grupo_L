import { Component, Input } from '@angular/core';
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

  var_id!: string
  var_rol!: string

  searchQuery = ''

  arrayPrestamos: any[] = []
  filteredPrestamos: any[] = []
  paginatedPrestamos: any[] = []
  currentPage: number = 1 // Página actual
  totalPages: number = 1 // Total de páginas
  itemsPerPage: number = 5 // Cantidad de Prestamos por página

  @Input() set filteredPrestamosPadre(value: any[]) {
    console.log("Aca esta el value", value)
    if (value) {
      console.log("Aca esta el value parte 2", value)
      this.originalPrestamos = [...value]
      this.uniqueUsersArray = [...new Set(value.map(prestamo => prestamo.usuario.id_usuario))];
      this.uniqueUserPrestamos = this.uniqueUsersArray.map(userId => {
        return value.find(prestamo => prestamo.usuario.id_usuario === userId);
      });
    }
  }
  uniqueUsersArray: any[] = [];
  uniqueUserPrestamos: any[] = [];
  originalPrestamos: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private prestamosService: PrestamosService
  ){}

  ngOnInit() {
    this.var_id = this.route.snapshot.paramMap.get('id') || '';
    this.var_rol = this.route.snapshot.paramMap.get('rol') || '';

    console.log('this.var_id: ', this.var_id);
    console.log('this.var_rol: ', this.var_rol);
    this.fetchPrestamos();
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
      this.currentPage = rta.pagina;
      this.totalPages = rta.paginas;
      console.log("Filtered Prestamos", this.filteredPrestamos)
      this.paginatedPrestamos = [...this.filteredPrestamos]
      console.log("Paginated Prestamos", this.paginatedPrestamos)
    });
  }

  filterPrestamos(): void {
    if (this.searchQuery.trim() === '') {
      this.filteredPrestamos = [...this.arrayPrestamos];
    } else {
      this.filteredPrestamos = this.arrayPrestamos.filter(prestamo =>
        prestamo.libro.titulo.toLowerCase().includes(this.searchQuery.toLowerCase()),
        // Agrega más criterios de búsqueda según sea necesario
      );
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.fetchPrestamos(page); // Obtén los prestamos de la página actualizada
    }
  }

  countPrestamosByUser(userId: string) {
    console.log(this.originalPrestamos)
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