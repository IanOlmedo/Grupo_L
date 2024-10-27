import { Component, NgModule } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BooksService } from './../../services/books.service'

@Component({
  selector: 'app-ver-libro',
  templateUrl: './ver-libro.component.html',
  styleUrl: './ver-libro.component.css'
})
export class VerLibroComponent {
  var_id!:string

  book:any
  arrayAuthor:any[] = []

  constructor(
    private route: ActivatedRoute,
    private booksService: BooksService,
  ){}


  ngOnInit(){
    this.var_id = this.route.snapshot.paramMap.get('id') || '';
    this.booksService.getOneBook(this.var_id).subscribe((rta:any) =>{
      console.log(rta)
      this.book = rta || null
      console.log(this.book)
      console.log(this.book.año_de_publicacion)
      this.arrayAuthor = rta.autor || []
      console.log(this.arrayAuthor)
    },
  )
  }

  get isAdmin() {
    return localStorage.getItem('user_role') === 'admin';
  }
}
