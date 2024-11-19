import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})
export class CatalogoComponent {
  var_id!: string
  var_rol!: string

  searchQuery = ''

  arrayBooks: any[] = []
  filteredBooks: any[] = []
  paginatedBooks: any[] = []
  currentPage: number = 1 // Página actual
  totalPages: number = 1 // Total de páginas
  itemsPerPage: number = 12 // Cantidad de libros por página

  constructor(
    private route: ActivatedRoute,
    private booksService: BooksService,
  ) { }

  ngOnInit() {
    this.var_id = this.route.snapshot.paramMap.get('id') || '';
    this.var_rol = this.route.snapshot.paramMap.get('rol') || '';

    console.log('this.var_id: ', this.var_id);
    console.log('this.var_rol: ', this.var_rol);
    this.fetchBooks();
  }

  fetchBooks(page: number = 1): void {
    const params = {
      page: page.toString(),
      per_page: this.itemsPerPage.toString()
    };
    this.booksService.getBooks(params).subscribe((rta: any) => {
      console.log('libros api: ', rta);
      this.arrayBooks = rta.libros || [];
      this.filteredBooks = [...this.arrayBooks]; 
      this.filterBooks(); // Actualiza filteredBooks al obtener los libros
      this.currentPage = rta.pagina;
      this.totalPages = rta.paginas;
      this.paginatedBooks = rta.libros;
    });
  }

  filterBooks(): void {
    if (this.searchQuery.trim() === '') {
      this.filteredBooks = [...this.arrayBooks];
    } else {
      this.filteredBooks = this.arrayBooks.filter(book =>
        book.titulo.toLowerCase().includes(this.searchQuery.toLowerCase())
        // Agrega más criterios de búsqueda según sea necesario
      );
    }
  }


  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      console.log('Pagina: '+page)
      this.currentPage = page;
      console.log('pagina actual:'+this.currentPage)
      this.fetchBooks(page); // Obtén los libros de la página actualizada
    }
  }
  
  get isUser() {
    return localStorage.getItem('user_role') === 'user';
  }

  get isAdmin() {
    return localStorage.getItem('user_role') === 'admin';
  }
}
