import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';  // Importa el servicio

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']  // Corregido styleUrls
})
export class UsuariosComponent implements OnInit {
  var_id!: string;
  var_rol!: string;
  userData: any = {};  // Aquí almacenamos los datos del usuario
  editMode: boolean = false;  // Controla si los campos son editables o no

  constructor(
    private route: ActivatedRoute,
    private usuariosService: UsuariosService  // Inyecta el servicio
  ){}

  ngOnInit(): void {
    this.var_id = this.route.snapshot.paramMap.get('id') || '';
    this.var_rol = this.route.snapshot.paramMap.get('rol') || '';
    this.getUserData();  // Cargar los datos del usuario al iniciar
  }

  // Obtener los datos del usuario a través del servicio
  getUserData(): void {
    this.usuariosService.getUserRole();  // Si necesitas cargar el rol desde el servicio
    const params = {}
    // Asumimos que los datos del usuario incluyen el rol y otros detalles
    this.usuariosService.getUsers(params).subscribe(
      (data: any) => {
        const usuario = data.find((user: any) => user.id === this.var_id);
        if (usuario) {
          this.userData = usuario;
        }
      },
      (error) => {
        console.error('Error obteniendo los datos del usuario', error);
      }
    );
  }

  // Cambiar el modo de edición
  toggleEditMode(): void {
    this.editMode = !this.editMode;  // Alternar el modo de edición
  }

  // Guardar los datos del usuario actualizados
  saveUserData(): void {
    this.usuariosService.updateUser(this.var_id, this.userData).subscribe(
      (response) => {
        console.log('Datos actualizados con éxito');
        this.editMode = false;  // Desactiva el modo de edición tras guardar
      },
      (error) => {
        console.error('Error actualizando los datos', error);
      }
    );
  }
}