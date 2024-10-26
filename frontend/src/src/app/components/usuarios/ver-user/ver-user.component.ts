import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from '../../../services/usuarios.service';

@Component({
  selector: 'app-ver-user',
  templateUrl: './ver-user.component.html',
  styleUrl: './ver-user.component.css'
})
export class VerUserComponent {
  @Input() var_id!: string;
  @Input() var_rol!: string;

  role = localStorage.getItem('user_role');

  searchQuery = '';

  arrayUsuarios: any[] = [];
  filteredUsers: any[] = [];
  paginatedUsers: any[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  itemsPerPage: number = 3;

  constructor(
    private router: Router,
    private usuariosService: UsuariosService
  ) { }

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers(page: number = 1): void {
    this.usuariosService.getUsers(page).subscribe((rta: any) => {
      console.log('usuarios api: ', rta);
      this.arrayUsuarios = rta.usuarios || [];
      this.filterUsers();
      this.currentPage = rta.pagina;
      this.totalPages = rta.paginas;
      this.updatePaginatedUsers();
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
    this.updatePaginatedUsers();
  }

  updatePaginatedUsers(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedUsers = this.filteredUsers.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.fetchUsers(page);
    }
  }

  editarusuario(user: any) {
    console.log('Estoy editando', user);
    this.router.navigate(['/agregar_usuario/' + user.id + '/admin']);
  }

  crearusuario() {
    this.router.navigate(['agregar_usuario']);
  }

  buscar() {
    console.log('buscar: ', this.searchQuery);
    this.filterUsers();
  }

  eliminarusuario(user: any) {
    this.usuariosService.deleteUser(user.id_usuario).subscribe(() => {
      this.arrayUsuarios = this.arrayUsuarios.filter(u => u.id_usuario !== user.id_usuario);
      this.filterUsers();
    });
  }
}
