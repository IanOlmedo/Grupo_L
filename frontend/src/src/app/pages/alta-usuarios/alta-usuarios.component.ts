import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alta-usuarios',
  templateUrl: './alta-usuarios.component.html',
  styleUrl: './alta-usuarios.component.css'
})
export class AltaUsuariosComponent {
  var_id!:string
  var_rol!:string

  searchQuery = '';
  arrayUsuarios = [
    {
      id: 1,
      nombre: 'Carlos'
    },
    {
      id: 2,
      nombre: 'Juan'
    },
    {
      id: 3,
      nombre: 'Pedro'
    },
    {
      id: 4,
      nombre: 'Usuario 4'
    }

  ]
  
    filteredUsers = [...this.arrayUsuarios]
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(){
    this.var_id = this.route.snapshot.paramMap.get('id') || '';
    this.var_rol=this.route.snapshot.paramMap.get('rol') || '';
  }

  editarusuario(user:any) {
    console.log('Estoy editando', user);
    this.router.navigate(['/usuario/'+user.id+'/Editar']);
  }

  buscar() {
    console.log('buscar: ', this.searchQuery);
    this.filteredUsers = this.arrayUsuarios.filter(user => user.nombre.includes(this.searchQuery));
  }
  
}
