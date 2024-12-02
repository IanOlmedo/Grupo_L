import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  terrorBooks: any[] = [];
  fantasyBooks: any[] = [];
  romanceBooks: any[] = [];
  bookCategories: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private booksService: BooksService,
  ) { }

  ngOnInit() {
    this.fetchBooksGenre('terror', this.terrorBooks);
    this.fetchBooksGenre('fantasia', this.fantasyBooks);
    this.fetchBooksGenre('romance', this.romanceBooks);

    this.bookCategories = [
      { name: 'Terror', books: this.terrorBooks },
      { name: 'Fantasía', books: this.fantasyBooks },
      { name: 'Romance', books: this.romanceBooks },
  ];
  }
  get isToken() {
    return localStorage.getItem('token');
  }

  fetchBooksGenre(genre:string, booksArray:any[]):void{
    const params = {
      page: '1',
      per_page: '3',
      genero: genre,
      sortby_genero:'true'
    }

    this.booksService.getBooks(params).subscribe((rta:any) =>{
      console.log('libros por genero:', rta);
      booksArray.push(...rta.libros);
    })
  }

  performSearch() {
    const searchInput = (document.getElementById('searchInput') as HTMLInputElement).value;
    console.log('Buscando:', searchInput);
  }
}