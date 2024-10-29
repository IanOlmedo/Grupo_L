import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AuthService } from "../../services/auth.service"
import { UsuariosService } from "../../services/usuarios.service"
import { Router } from "@angular/router"

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
  
})
export class RegisterComponent {
 registerForm!: FormGroup;
  var_id!:string
  var_rol!:string
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private usuarioService: UsuariosService,
    private router: Router
  ){this.registerForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required]})
}

ngOnInit(): void {
  // Definimos el formulario con los campos y validaciones
  this.registerForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]], 
    password: ['', [Validators.required, Validators.minLength(6)]], 
    confirmPassword: ['', Validators.required]
  }, { validator: this.passwordMatchValidator }); 
}

// Función personalizada para validar si las contraseñas coinciden
  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true }; 
  }

  

  irRegister(dataRegister:any) {
    console.log(dataRegister)
    this.authService.register(dataRegister).subscribe({

      next: (rta:any) => {
        alert('Credenciales correctas!!!');
        console.log('Exito: ', rta);
        this.router.navigateByUrl('home');
      }, error: (err:any) => {
        alert('Usuario o contraseña incorrecta.');
        console.log('Exito: ', err);
      }, complete: () => {
        console.log('Finalizo');
      }
    })

  }
  submit() {
    if(this.registerForm.valid) {
      console.log('Datos del formulario: ',this.registerForm.value);
      this.irRegister(this.registerForm.value);
    } else {
      alert('Los valores son requeridos');
    }
  }




}
 


