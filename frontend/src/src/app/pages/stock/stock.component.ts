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
  itemsPerPage: number = 5;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private booksService: BooksService,
  ){}

  ngOnInit(){
    this.fetchBooks();
  }

  fetchBooks(page: number = 1): void {
    const params = {
      page: page.toString(),
      per_page: this.itemsPerPage.toString(),
      titulo: this.searchQuery || ''
    };
    this.booksService.getBooks(params).subscribe((rta: any) => {
      console.log(rta)
      console.log('libros api: ', rta);
      this.arrayLibros = rta.libros || [];
      //this.filterBooks();
      this.currentPage = rta.pagina;
      this.totalPages = rta.paginas;
    });
  }
/*
  filterBooks(): void {
    if (this.searchQuery.trim() === '') {
      console.log("Search", this.searchQuery)
      this.filteredLibros = [...this.arrayLibros];
    } else {
      this.filteredLibros = this.arrayLibros.filter(book =>
        book.titulo.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
    this.paginatedLibros = [...this.filteredLibros]
  }
*/
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.fetchBooks(page);
    }
  }

  onSearchQueryChange(searchQuery: string) {
    this.searchQuery = searchQuery;
    //this.filterBooks();
  }

}

