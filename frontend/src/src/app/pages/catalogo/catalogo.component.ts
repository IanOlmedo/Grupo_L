import { Component, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BooksService } from '../../services/books.service';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})
export class CatalogoComponent {
  var_id!: string

  searchQuery: string = ''

  arrayBooks: any[] = []
  filteredBooks: any[] = []
  paginatedBooks: any[] = []
  currentPage: number = 1 // Página actual
  totalPages: number = 1 // Total de páginas
  itemsPerPage: number = 12 // Cantidad de libros por página

  constructor(
    private route: ActivatedRoute,
    private booksService: BooksService,
    private carritoService: CarritoService,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.var_id = this.route.snapshot.paramMap.get('id') || '';
    this.fetchBooks();
  }

  fetchBooks(page: number = 1): void {
    console.log(this.searchQuery)
    const params = {
      page: page.toString(),
      per_page: this.itemsPerPage.toString(),
      titulo: this.searchQuery || ''
    };
    this.booksService.getBooks(params).subscribe((rta: any) => {
      console.log('libros api: ', rta);
      this.arrayBooks = rta.libros || [];
      this.filteredBooks = [...this.arrayBooks]; 
      //this.filterBooks(); // Actualiza filteredBooks al obtener los libros
      this.currentPage = rta.pagina;
      this.totalPages = rta.paginas;
      this.paginatedBooks = rta.libros;
      console.log('Total pages:', this.totalPages);
      this.cdr.detectChanges();
    });
  }
/*
  filterBooks(): void {
    if (this.searchQuery.trim() === '') {
      this.filteredBooks = [...this.arrayBooks];
    } else {
      this.filteredBooks = this.arrayBooks.filter(book =>
        book.titulo.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }
*/

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.fetchBooks(page); // Obtén los libros de la página actualizada
    }
  }
  
  get isUser() {
    return localStorage.getItem('user_role') === 'users';
  }

  get isAdmin() {
    return localStorage.getItem('user_role') === 'admin';
  }

  get isBiblo(){
    return localStorage.getItem('user_role') === 'biblo';
  }

  addToCart(book: any): void{
    this.carritoService.addToCart(book);
    alert('Libro agregado al carrito')
  }

  onSearchQueryChange(searchQuery: string) {
    this.searchQuery = searchQuery;
    this.fetchBooks();
  }

}
