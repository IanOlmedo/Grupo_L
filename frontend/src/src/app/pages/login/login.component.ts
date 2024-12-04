import { Component } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { AuthService } from "../../services/auth.service"
import { UsuariosService } from "../../services/usuarios.service"
import { Router } from "@angular/router"
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private usuarioService: UsuariosService,
  ){this.loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required]})
   }

  irAlLogin(dataLogin:any) {
    this.authService.login(dataLogin).subscribe({
      next: (rta:any) => {
        alert('Credenciales correctas!!!');
        console.log('Exito: ', rta);
        localStorage.setItem('token', rta.access_token);
        localStorage.setItem('user_id', rta.id_usuario.toString())
        this.usuarioService.getUserRole()
        this.router.navigateByUrl('home');
      }, error: (err:any) => {
        alert('Usuario o contraseña incorrecta.');
        console.log('Exito: ', err);
        localStorage.removeItem('token');
        localStorage.removeItem('user_id')
      }, complete: () => {
        console.log('Finalizo');
      }
    })
  }
  submit() {
    if(this.loginForm.valid) {
      console.log('Datos del formulario: ',this.loginForm.value);
      this.irAlLogin(this.loginForm.value);
    } else {
      alert('Los valores son requeridos');
    }
  }

  
}


