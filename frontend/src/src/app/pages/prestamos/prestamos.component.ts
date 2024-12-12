import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PrestamosService } from '../../services/prestamos.service';

@Component({
  selector: 'app-prestamos',
  templateUrl: './prestamos.component.html',
  styleUrl: './prestamos.component.css'
})
export class PrestamosComponent {
  var_id!: string;

  arrayPrestamos: any[] = [];
  filteredPrestamosPadre: any[] = [];
  arrayPrestamosWithDetails: any[] = [];
  prestamos: any[] = [];

  searchQuery: string = '';
  currentPage: number = 1;
  totalPages: number = 1;
  itemsPerPage: number = 8;

  constructor(
    private route: ActivatedRoute,
    private prestamosService: PrestamosService,
  ) {}

  get isToken() {
    return localStorage.getItem('token');
  }

  ngOnInit() {
    this.var_id = this.route.snapshot.paramMap.get('id') || '';
  }

  get isRole() {
    return localStorage.getItem('user_role');
  }

  get isUser() {
    return localStorage.getItem('user_role') === 'users';
  }

  get isAdmin() {
    return localStorage.getItem('user_role') === 'admin';
  }

  get isBiblo(){
    return localStorage.getItem('user_role') === 'biblo';
  }

  searchQueryChange(query:string){
    this.searchQuery = query;
    console.log("Query: "+this.searchQuery)
  }

}
