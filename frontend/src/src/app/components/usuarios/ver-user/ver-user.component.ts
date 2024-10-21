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

  role = localStorage.getItem('user_role')
  
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
    this.router.navigate(['/agregar_usuario/'+user.id]);
  }

  crearusuario(){
    this.router.navigate(['agregar_usuario'])
  }

  buscar() {
    console.log('buscar: ', this.searchQuery);
    this.filteredUsers = this.arrayUsuarios.filter(user => user.nombre_completo.includes(this.searchQuery));
  }

  eliminarusuario(user: any){
    this.usuariosService.deleteUser(user.id_usuario).subscribe(()=>{
      this.arrayUsuarios = this.arrayUsuarios.filter(u => u.id_usuario !== user.id_usuario);
      this.filteredUsers = [...this.arrayUsuarios];
    });
  }
}
