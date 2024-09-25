import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.css'
})
export class StockComponent {
  var_id!:string
  var_rol!:string
    searchQuery = '';
    arrayLibros = [
      {
        id: 1,
        nombre: 'Fuego y sangre'
      },
      {
        id: 2,
        nombre: 'Harry Potter'
      },
      {
        id: 3,
        nombre: 'Nacidos de la bruma'
      },
      {
        id: 4,
        nombre: 'Percy Jackson'
      }

    ]

    filteredLibros = [...this.arrayLibros]
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(){
    this.var_id = this.route.snapshot.paramMap.get('id') || '';
    this.var_rol=this.route.snapshot.paramMap.get('rol') || '';
  }

  editarlibro(libro:any) {
    console.log('Estoy editando', libro);
    this.router.navigate(['/usuario/'+libro.id+'/Editar']);
  }

  buscar() {
    console.log('buscar: ', this.searchQuery);
    this.filteredLibros = this.arrayLibros.filter(libro => libro.nombre.includes(this.searchQuery));
  }

}

