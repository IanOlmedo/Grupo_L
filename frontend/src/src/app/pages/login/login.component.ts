import { Component } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { AuthService } from "../../services/auth.service"
import { Router } from "@angular/router"
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;
  var_id!:string
  var_rol!:string
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder,
  ){this.loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required]})
   }
  ngOnInit(){
    this.var_id = this.route.snapshot.paramMap.get('id') || '';
    this.var_rol=this.route.snapshot.paramMap.get('rol') || '';
  }
  irAlLogin(dataLogin:any) {
    this.authService.login(dataLogin).subscribe({
      next: (rta:any) => {
        alert('Credenciales correctas!!!');
        console.log('Exito: ', rta);
        localStorage.setItem('token', rta.access_token);
        this.router.navigateByUrl('home');
      }, error: (err:any) => {
        alert('Usuario o contraseña incorrecta.');
        console.log('Exito: ', err);
        localStorage.removeItem('token');
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


