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
  currentPage: number = 1 
  totalPages: number = 1
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
    this.booksService.getBooks(page).subscribe((rta: any) => {
      console.log('libros api: ', rta);
      this.arrayBooks = rta.libros || [];
      /*this.filteredBooks = [...this.arrayBooks]; */
      this.filteredBooks = this.arrayBooks;
      this.currentPage = rta.page;
      this.totalPages = rta.pages;
      this.updatePaginatedBooks();
    });
  }

  updatePaginatedBooks(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedBooks = this.filteredBooks.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedBooks();
    }
  }

}
