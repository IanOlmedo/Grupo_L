import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})
export class CatalogoComponent {
  var_id!:string
  var_rol!:string

  searchQuery = ''

  arrayBooks:any[] = []

  filteredBooks:any[] = []
  
  constructor(
    private route: ActivatedRoute,
    private booksService: BooksService,
  ){}

  ngOnInit(){
    this.var_id = this.route.snapshot.paramMap.get('id') || '';
    this.var_rol=this.route.snapshot.paramMap.get('rol') || '';

    console.log('this.var_id: ',this.var_id);
    console.log('this.var_rol: ',this.var_rol);
    this.booksService.getBooks().subscribe((rta:any)=>{
      console.log('libros api: ',rta);
      this.arrayBooks = rta.libros || [];
      this.filteredBooks = [...this.arrayBooks]
    })
  }
}
