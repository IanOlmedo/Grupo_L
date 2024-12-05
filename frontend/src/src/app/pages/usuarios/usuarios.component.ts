import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';  // Importa el servicio
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'
import { take } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']  // Corregido styleUrls
})
export class UsuariosComponent implements OnInit {
  var_id!: string;
  userData: any = {};  // Aquí almacenamos los datos del usuario
  editMode: boolean = false;  // Controla si los campos son editables o no
  selectedFile: File | null = null;

  userForm = new FormGroup({
    nombre_completo: new FormControl('', Validators.required),
    direccion: new FormControl('', Validators.required),
    dni: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    telefono: new FormControl('', Validators.required)
  });

  constructor(
    private route: ActivatedRoute,
    private usuariosService: UsuariosService  // Inyecta el servicio
  ){}

  ngOnInit(): void {
    this.var_id = this.route.snapshot.paramMap.get('id') || '';
    this.getUserData();  // Cargar los datos del usuario al iniciar
  }

  /*this.booksService.getOneBook(this.var_id).subscribe((rta:any) =>{
    console.log(rta)
    this.book = rta || null
    console.log(this.book)
    console.log(this.book.año_de_publicacion)
    this.arrayAuthor = rta.autor || []
    console.log(this.arrayAuthor)
  }, */

  // Obtener los datos del usuario a través del servicio
  getUserData(): void {
    this.usuariosService.getUserRole();
    this.usuariosService.getOneUser(this.var_id).pipe(take(1)).subscribe((rta: any) => {
      console.log("Esta es la respuesta:", rta);
      this.userData = rta || null;
    });
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
  get isRole() {
    return localStorage.getItem('user_role');
  }  

  get isUser() {
    return localStorage.getItem('user_role') === 'user';
  }

  get isAdmin() {
    return localStorage.getItem('user_role') === 'admin';
  }

  onSubmit() {
    if (this.userForm.valid) {
      if (this.var_id !== '' && this.var_id !== null && this.var_id !== undefined) {
        this.usuariosService.updateUser(this.var_id, this.userForm.value).subscribe({
          next: () => {
            console.log('Usuario actualizado con éxito');
            alert('Usuario actualizado con exito')
          },
          error: (err) => {
            console.error('Error al actualizar el usuario:', err);
            alert('Hubo un error al actualizar el usuario. Por favor, inténtelo más tarde')
          }
        });
      } else {
        console.error('El ID del usuario no es válido');
      }
    } else {
      console.error('El formulario no es válido');
    }
  }
  
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmitImage(): void {
    if (this.selectedFile) {
      // Aquí puedes manejar el archivo seleccionado, por ejemplo, subirlo a un servidor
      console.log('Archivo seleccionado:', this.selectedFile.name);
    } else {
      console.error('No se seleccionó ningún archivo');
    }
  }
}
