import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';  // Importa el servicio
import { FormBuilder, FormGroup, Validators, FormControl, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms'
import { take } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']  // Corregido styleUrls
})
export class UsuariosComponent implements OnInit {
  var_id!: string;
  userData: any = {};  // Aquí almacenamos los datos del usuario
  selectedFile: File | null = null;

  userForm = new FormGroup({
    nombre_completo: new FormControl('', Validators.required),
    direccion: new FormControl('', Validators.required),
    dni: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    telefono: new FormControl('', Validators.required)
  });

  passwordForm = new FormGroup({
    currentPassword: new FormControl('', Validators.required),
    newPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
  }, {validators : this.passwordMatchValidator()})

  constructor(
    private route: ActivatedRoute,
    private usuariosService: UsuariosService,
    private authService: AuthService,
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
      this.userForm.patchValue({
        ...rta,
        password: ''
      })
    });
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
        const currentPassword = this.userForm.value.password || ''
        console.log(currentPassword)
        this.authService.verifyPassword(this.var_id, currentPassword).subscribe({
          next: (response) => {
            console.log(response)
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
          },
          error: (err) => {
            console.log(err)
            alert('Contraseña Incorrecta')
          }
        });
      } else {
        console.error('El ID del usuario no es válido');
      }
    } else {
      console.error('El formulario no es válido');
      alert('Es necesario completar el formulario para actualizar')
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

  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const formGroup = control as FormGroup;
      const password = formGroup.get('newPassword')?.value;
      const confirmPassword = formGroup.get('confirmPassword')?.value;
      console.log("Contraseña nueva: " + password + " Confirmación: " + confirmPassword);
      return password === confirmPassword ? null : { mismatch: true };
    };
  }

  onSubmitPassword(): void{
    if (this.passwordForm.valid){
      console.log('Ejemplo: ', this.passwordForm.value)
      const currentPassword = this.passwordForm.value.currentPassword || ''
      this.authService.verifyPassword(this.var_id, currentPassword).subscribe({
        next: (response) =>{
            const newPassword = this.passwordForm.value.newPassword || ''
            this.usuariosService.patchUser(this.var_id, newPassword).subscribe(
              () => {
                alert("Se actualizo la contraseña con exito")
              },
              (error)=>{
                console.log('Error al actualizar la contraseña: ', error.message);
                alert("Hubo un error al actualizar la contraseña. Por favor, inténtelo de nuevo más tarde")
              }
            )
        },
        error: (err) =>{
          console.error('Error al verificar la contraseña:', err);
          alert('Introdujo incorrectamente su actual contraseña')
        }
      })
    }else{
      alert("Confirmo incorrectamente su nueva contraseña")
    }
  }
  
}
