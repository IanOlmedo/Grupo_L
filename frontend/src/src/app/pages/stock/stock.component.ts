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
      this.currentPage = rta.pagina;
      this.totalPages = rta.paginas;
    });
  }
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.fetchBooks(page);
    }
  }

  onSearchQueryChange(searchQuery: string) {
    this.searchQuery = searchQuery;
    this.fetchBooks();
  }

  deleteBook(user:any){
    this.booksService.deleteBook(user.id_libro.toString()).subscribe(
      () => {
        alert("El libro ha sido eliminado con correctamente")
        this.fetchBooks();
      },
      (error) => {
        console.log('Error: ', error.message)
        alert('Hubo un error al eliminar el libro. Por favor, inténtelo de nuevo más tarde')
      }
    );
  }

}

