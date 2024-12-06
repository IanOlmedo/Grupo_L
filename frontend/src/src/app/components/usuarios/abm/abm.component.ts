import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'
import { UsuariosService } from '../../../services/usuarios.service';

@Component({
  selector: 'app-abm',
  templateUrl: './abm.component.html',
  styleUrl: './abm.component.css'
})
export class AbmComponent {
  var_id!:string

  roleOptions = [
    {value: 'admin', label: 'Administrador'},
    {value: 'users', label: 'Usuario'},
    {value: 'biblo', label: 'Biblotecario'}
  ]

  
  userForm = new FormGroup({
    nombre_completo: new FormControl('', Validators.required),
    direccion: new FormControl('', Validators.required),
    dni: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    rol: new FormControl('', Validators.required),
    telefono: new FormControl('', Validators.required)
  });

  constructor(
    private route:ActivatedRoute,
    private usuariosService: UsuariosService
  ) { }

  ngOnInit(): void {
    this.var_id = this.route.snapshot.paramMap.get('id') || '';
    if (this.var_id){
      this.usuariosService.getOneUser(this.var_id).subscribe(
        (user) =>{
          this.userForm.patchValue({
            ...user,
            password: "Contraseña"
          })
        })
    }
    console.log(localStorage.getItem('user_role')==='admin');
  }

  onSubmit() {
    if (this.userForm.valid) {
      if (this.var_id !== '') {
        console.log("Llegue hasta aqui");
        console.log(typeof(this.var_id))
        console.log(this.var_id)
        this.usuariosService.updateUser(this.var_id, this.userForm.value).subscribe(
          () => {
            alert('Usuario actualizado correctamente')
        },
      (error) => {
        console.log('Error al actualizar el usuario: ',error.message)
        alert('Hubo un error al actualizar el libro. Por favor, inténtelo de nuevo más tarde')
      });
      } else {
        this.usuariosService.createUser(this.userForm.value).subscribe(
          () => {
            alert('Usuario creado correctamente')
        },
      (error) => {
        console.log('Hubo un error al crear el libro. Por favor, inténtelo de nuevo más tarde')
      });
      }
    }
  }
}
