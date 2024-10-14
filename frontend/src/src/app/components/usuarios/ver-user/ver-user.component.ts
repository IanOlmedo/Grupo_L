import { Component, Input } from '@angular/core';
import {Router} from '@angular/router'
import { UsuariosService } from '../../../services/usuarios.service'

@Component({
  selector: 'app-ver-user',
  templateUrl: './ver-user.component.html',
  styleUrl: './ver-user.component.css'
})
export class VerUserComponent {
  @Input() var_id!: string;
  @Input() var_rol!: string;
  
  searchQuery = ''

  arrayUsuarios:any[] = []

  filteredUsers:any[] = []

  constructor(
    private router: Router,
    private usuariosService: UsuariosService
  ){}

  ngOnInit() {
    this.usuariosService.getUsers().subscribe((rta:any) => {
      console.log('usuarios api: ',rta);
      this.arrayUsuarios = rta.usuarios || [];
      this.filteredUsers = [...this.arrayUsuarios]
    })
  }

  editarusuario(user:any) {
    console.log('Estoy editando', user);
    this.router.navigate(['/usuario/'+user.id+'/Editar']);
  }

  buscar() {
    console.log('buscar: ', this.searchQuery);
    this.filteredUsers = this.arrayUsuarios.filter(user => user.name.includes(this.searchQuery));
  }
}
