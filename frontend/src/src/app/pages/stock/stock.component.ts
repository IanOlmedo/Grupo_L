import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { BooksService } from '../../services/books.service'

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.css'
})
export class StockComponent {
  role = localStorage.getItem('user_role');

  searchQuery = '';

  arrayLibros: any[] = [];
  filteredLibros: any[] = [];
  paginatedLibros: any[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  itemsPerPage: number = 3;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private booksService: BooksService,
  ){}

  ngOnInit(){
    this.fetchUsers();
  }

  fetchUsers(page: number = 1): void {
    this.booksService.getBooks(page).subscribe((rta: any) => {
      console.log(rta)
      console.log('usuarios api: ', rta);
      this.arrayLibros = rta.libros || [];
      this.filterUsers();
      this.currentPage = rta.pagina;
      this.totalPages = rta.paginas;
      this.updatePaginatedUsers();
    });
  }

  filterUsers(): void {
    if (this.searchQuery.trim() === '') {
      this.filteredLibros = [...this.arrayLibros];
    } else {
      this.filteredLibros = this.arrayLibros.filter(book =>
        book.nombre_completo.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
    this.updatePaginatedUsers();
  }

  updatePaginatedUsers(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedLibros = this.filteredLibros.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.fetchUsers(page);
    }
  }

  editarlibro(libro:any) {
    console.log('Estoy editando', libro);
    this.router.navigate(['/ver_libro/'+libro.id]);
  }

  buscar() {
    console.log('buscar: ', this.searchQuery);
    this.filteredLibros = this.arrayLibros.filter(libro => libro.nombre.includes(this.searchQuery));
  }

  

}

