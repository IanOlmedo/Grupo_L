import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ValoracionesService } from '../../services/valoraciones.service';

@Component({
  selector: 'app-valoraciones',
  templateUrl: './valoraciones.component.html',
  styleUrls: ['./valoraciones.component.css']
})
export class ValoracionesComponent {
  var_rol!: string;
  var_id!: string;

  searchQuery = ''

  arrayValoraciones: any[] = []
  filteredValoraciones: any[] = []
  paginatedValoraciones: any[] = []
  currentPage: number = 1 // Página actual
  totalPages: number = 1 // Total de páginas
  itemsPerPage: number = 3 // Cantidad de libros por página

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private valoracionesService: ValoracionesService,
  ) {
    console.log('Constructor called');
  }

  ngOnInit() {
    console.log('ngOnInit called');
    this.var_id = this.route.snapshot.paramMap.get('id') || '';
    console.log('this.var_id: ', this.var_id);
    this.var_rol = this.route.snapshot.paramMap.get('rol') || '';
    console.log('this.var_rol: ', this.var_rol);
    this.fetchValoraciones();
  }

  getStars(calificacion: number): Array<number> {
    console.log('getStars called with calificacion: ', calificacion);
    return Array(5).fill(0).map((x, i) => i);
  }

  fetchValoraciones(page: number = 1): void {
    console.log('fetchValoraciones called with page: ', page);
    this.valoracionesService.getValoraciones(page).subscribe((rta: any) => {
      console.log('valoracion api: ', rta);
      this.arrayValoraciones = rta.valoraciones || [];
      console.log('this.arrayValoraciones: ', this.arrayValoraciones);
      this.filterValoraciones();
      this.currentPage = rta.pagina;
      console.log('this.currentPage: ', this.currentPage);
      this.totalPages = rta.paginas;
      console.log('this.totalPages: ', this.totalPages);
      this.updatePaginatedValoraciones();
    });
  }

  filterValoraciones(): void { //Buscar
    console.log('filterValoraciones pepe');
    if (this.searchQuery.trim() === '') {
      this.filteredValoraciones = [...this.arrayValoraciones];
      console.log('hola2: ', this.filteredValoraciones)
    } else {
      this.filteredValoraciones = this.arrayValoraciones.filter(valoracion =>
        valoracion.valoracion.libro.titulo.toLowerCase().includes(this.searchQuery.toLowerCase()),
        console.log('hola1: ', this.filteredValoraciones)
        // Agrega más criterios de búsqueda según sea necesario
        
      );
    }
    console.log('this.filteredValoraciones: ', this.filteredValoraciones);
    this.updatePaginatedValoraciones();
  }

  updatePaginatedValoraciones(): void {
    console.log('updatePaginatedValoraciones led');
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedValoraciones = this.filteredValoraciones.slice(startIndex, endIndex);
    console.log('startIndex: ', startIndex);
    console.log('endIndex: ', endIndex);
    console.log('slice(startIndex, endIndex);: ', this.filteredValoraciones.slice(startIndex, endIndex),
    console.log('this.filteredValoraciones: ', this.filteredValoraciones),
    console.log('this.paginatedValoraciones: ', this.paginatedValoraciones),
    );
  }

  goToPage(page: number): void {
    console.log('goToPage called with page: ', page);
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.fetchValoraciones(page);
    }
  }
}
