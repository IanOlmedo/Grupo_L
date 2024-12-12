import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from './../../services/books.service';
import { AutoresService } from '../../services/autores.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-alta-libros',
  templateUrl: './alta-libros.component.html',
  styleUrl: './alta-libros.component.css'
})
export class AltaLibrosComponent {
  var_id!:string

  arrayAutores: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private booksService: BooksService,
    private autoresService: AutoresService,
    private router: Router,
  ){}

  ngOnInit() {
    this.var_id = this.route.snapshot.paramMap.get('id') || '';
    if (this.var_id) {
      this.booksService.getOneBook(this.var_id).subscribe(
        (book) => {
          const nombres_autores = book.autor.map((autor: any) => autor.nombre_completo).join(', ');
          console.log("Autores: ", nombres_autores)
          this.booksForm.patchValue({
            ...book,
            stock: parseInt(book.stock, 10),
            autores: nombres_autores
          });
        },
        (error) => {
          console.error('Error fetching book data', error);
        }
      );
    }
    console.log(this.booksForm)
    this.fetchAutores();
  }

  booksForm = new FormGroup({
    anio_de_publicacion: new FormControl('', Validators.required),
    descripcion: new FormControl('', [Validators.required]),
    editorial: new FormControl('', Validators.required),
    genero: new FormControl('', Validators.required),
    titulo: new FormControl('', Validators.required),
    stock: new FormControl(0, [Validators.required, Validators.min(0)]),
    imagen: new FormControl('', Validators.required),
    autores: new FormControl('', Validators.required),
  });

  onSubmit() {
    if (this.booksForm.valid) {
      if (this.var_id) {
        console.log(this.booksForm.value)
        this.booksService.updateBook(this.var_id, this.booksForm.value).subscribe(
          () => {
            alert('Se actualizo el libro correctamente')
        },
      (error) => {
        console.error('Error al actualizar el libro', error.message);
        alert('Hubo un error al actualizar el libro. Por favor, inténtelo de nuevo más tarde.');
      });
      } else {
        this.booksService.createBook(this.booksForm.value).subscribe(
          () => {
            alert('Se creo el libro correctamente')
        },
      (error)=>{
        console.log('Error al crear libro: ', error.message)
        alert('Hubo un error al crear el libro. Por favor, inténtelo de nuevo más tarde')
      });
      }
    }else{
      console.log("Formulario no valido")
    }
  }

  DeleteBook(){
    console.log("Eliminado")
    console.log(this.var_id)
    this.booksService.deleteBook(this.var_id).subscribe(
      () => {
        alert('El libro ha sido eliminado correctamente')
        this.router.navigateByUrl('stock');
      },
      (error) => {
        console.log('Error: ', error.message)
        alert('Hubo un error al eliminar el libro. Por favor, inténtelo de nuevo más tarde') 
      }
    )
  }

  fetchAutores(): void{
    this.autoresService.getAutores().subscribe((rta:any) =>{
      this.arrayAutores = rta
    })
  }

  eliminarAutor(id_autor:number): void{
    this.autoresService.deleteAutor(id_autor.toString()).subscribe(() => {
      this.arrayAutores = this.arrayAutores.filter(u => u.id_autor !== id_autor);
    });
  }
}
