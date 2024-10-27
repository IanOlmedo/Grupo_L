import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BooksService } from './../../services/books.service'
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-alta-libros',
  templateUrl: './alta-libros.component.html',
  styleUrl: './alta-libros.component.css'
})
export class AltaLibrosComponent {
  var_id!:string

  constructor(
    private route: ActivatedRoute,
    private booksService: BooksService,
  ){}

  ngOnInit(){
    this.var_id = this.route.snapshot.paramMap.get('id') || '';
  }

  booksForm = new FormGroup({
    titulo: new FormControl('', Validators.required),
    genero: new FormControl('', Validators.required),
    editorial: new FormControl('', Validators.required),
    anio_de_publicacion: new FormControl('', Validators.required),
    descripcion: new FormControl('', [Validators.required]),
    imagen: new FormControl('', Validators.required),
    stock: new FormControl('', Validators.required)
  });

  onSubmit() {
    if (this.booksForm.valid) {
      console.log(this.var_id)
      if (this.var_id) {
        console.log("Llegue hasta aqui");
        console.log(typeof(this.var_id))
        console.log(this.var_id)
        this.booksService.updateBook(this.var_id, this.booksForm.value).subscribe(() => {
        });
      } else {
        this.booksService.createBook(this.booksForm.value).subscribe(() => {
        });
      }
    }
  }

  DeleteBook(){
    console.log("Eliminado")
    console.log(this.var_id)
    this.booksService.deleteBook(this.var_id)
  }
}
