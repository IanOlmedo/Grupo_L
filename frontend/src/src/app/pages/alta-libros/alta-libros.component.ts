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

  ngOnInit() {
    this.var_id = this.route.snapshot.paramMap.get('id') || '';
    if (this.var_id) {
      this.booksService.getOneBook(this.var_id).subscribe(
        (book) => {
          this.booksForm.patchValue({
            ...book,
            stock: parseInt(book.stock, 10) // Convierte stock a número entero
          });
        },
        (error) => {
          console.error('Error fetching book data', error);
        }
      );
    }
    console.log(this.booksForm)
  }

  booksForm = new FormGroup({
    titulo: new FormControl('', Validators.required),
    genero: new FormControl('', Validators.required),
    editorial: new FormControl('', Validators.required),
    anio_de_publicacion: new FormControl('', Validators.required),
    descripcion: new FormControl('', [Validators.required]),
    imagen: new FormControl('', Validators.required),
    stock: new FormControl(0, [Validators.required, Validators.min(0)])
  });

  onSubmit() {
    if (this.booksForm.valid) {
      console.log(this.var_id)
      if (this.var_id) {
        console.log("Llegue hasta aqui");
        console.log(typeof(this.var_id))
        console.log(this.var_id)
        console.log(this.booksForm.value)
        this.booksService.updateBook(this.var_id, this.booksForm.value).subscribe(() => {
        });
      } else {
        this.booksService.createBook(this.booksForm.value).subscribe(() => {
        });
      }
    }else{
      console.log("No flaco")
    }
  }

  DeleteBook(){
    console.log("Eliminado")
    console.log(this.var_id)
    this.booksService.deleteBook(this.var_id)
  }
}
