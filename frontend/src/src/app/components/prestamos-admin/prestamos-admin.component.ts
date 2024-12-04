import { Component, Input, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PrestamosService } from '../../services/prestamos.service';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-prestamos-admin',
  templateUrl: './prestamos-admin.component.html',
  styleUrl: './prestamos-admin.component.css'
})
export class PrestamosAdminComponent {
  @Input() searchQuery = '';

  arrayUsuarios: any[] = []
  filteredUsuarios: any[] = []

  currentPage: number = 1 // Página actual
  totalPages: number = 1 // Total de páginas
  itemsPerPage: number = 5 // Cantidad de Prestamos por página

  constructor(
    private route: ActivatedRoute,
    private prestamosService: PrestamosService,
    private usuariosService: UsuariosService,
  ){}

  ngOnInit() {
    this.fetchUsers();
  }

  ngOnChanges(changes:SimpleChanges){
    if (changes['searchQuery']){
      this.fetchUsers();
    }
  }

  fetchUsers(page: number=1): void{
    const params = {
      page: page.toString(),
      per_page: this.itemsPerPage.toString(),
      nombre_completo: this.searchQuery || ''
    }
    this.usuariosService.getUsers(params).subscribe((rta:any)=>{
      this.arrayUsuarios = rta.usuarios || [];
      this.currentPage = rta.pagina;
      this.totalPages = rta.paginas

    })
  }


  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.fetchUsers(page); 
    }
  }

  countPrestamosByUser(userId: string) {
    return this.arrayUsuarios.reduce((count, usuario) => {
        if (usuario.id_usuario === Number(userId)) {
            return count + usuario.prestamos.length;
        } else {
            return count;
        }
    }, 0);
}


  countPrestamosVencidosByUser(userId: number): number {
    const fechaActual = new Date();
    return this.arrayUsuarios.reduce((count, usuario) => {
        if (usuario.id_usuario === userId) {
            return count + usuario.prestamos.reduce((prestamoCount:number, prestamo:any) => {
                const fechaVencimiento = new Date(prestamo.fecha_de_vencimiento.split("-").reverse().join("-"));
                if (fechaVencimiento < fechaActual && prestamo.estado === "no devuelto") {
                    return prestamoCount + 1;
                } else {
                    return prestamoCount;
                }
            }, 0);
        } else {
            return count;
        }
    }, 0);
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
}