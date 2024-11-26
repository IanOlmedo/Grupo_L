import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from '../../../services/usuarios.service';

@Component({
  selector: 'app-ver-user',
  templateUrl: './ver-user.component.html',
  styleUrl: './ver-user.component.css'
})
export class VerUserComponent {
  role = localStorage.getItem('user_role');

  searchQuery = '';

  arrayUsuarios: any[] = [];
  filteredUsers: any[] = [];
  paginatedUsers: any[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  itemsPerPage: number = 5;

  constructor(
    private router: Router,
    private usuariosService: UsuariosService
  ) { }

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers(page: number = 1): void {
    const params = {
      page: page.toString(),
      per_page: this.itemsPerPage.toString()
    };
    this.usuariosService.getUsers(params).subscribe((rta: any) => {
      console.log('usuarios api: ', rta);
      this.arrayUsuarios = rta.usuarios || [];
      this.filterUsers();
      this.currentPage = rta.pagina;
      this.totalPages = rta.paginas;
      this.paginatedUsers = rta.usuarios;
    });
  }

  filterUsers(): void {
    if (this.searchQuery.trim() === '') {
      this.filteredUsers = [...this.arrayUsuarios];
    } else {
      this.filteredUsers = this.arrayUsuarios.filter(user =>
        user.nombre_completo.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }


  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.fetchUsers(page);
    }
  }

  editarusuario(user: any) {
    console.log('Estoy editando', user);
    this.router.navigate(['/agregar_usuario/' + user.id]);
  }

  crearusuario() {
    this.router.navigate(['agregar_usuario']);
  }

  eliminarusuario(user: any) {
    this.usuariosService.deleteUser(user.id_usuario).subscribe(() => {
      this.arrayUsuarios = this.arrayUsuarios.filter(u => u.id_usuario !== user.id_usuario);
      this.filterUsers();
    });
  }

  onSearchQueryChange(searchQuery: string) {
    this.searchQuery = searchQuery;
    this.filterUsers();
  }
}
