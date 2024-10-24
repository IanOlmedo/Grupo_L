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
  var_rol!:string

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
    this.var_rol = this.route.snapshot.paramMap.get('rol') || '';
    
    
    console.log('this.var_id: ',this.var_id);
    console.log('this.var_rol: ',this.var_id);
    console.log(localStorage.getItem('user_role')==='admin');
  }

  onSubmit() {
    if (this.userForm.valid) {
      if (this.var_id !== '') {
        console.log("Llegue hasta aqui");
        console.log(typeof(this.var_id))
        console.log(this.var_id)
        this.usuariosService.updateUser(this.var_id, this.userForm.value).subscribe(() => {
        });
      } else {
        this.usuariosService.createUser(this.userForm.value).subscribe(() => {
        });
      }
    }
  }
}
