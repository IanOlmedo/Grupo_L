import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from "../../services/auth.service";
import { UsuariosService } from "../../services/usuarios.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private usuarioService: UsuariosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      Nombre: ['', [Validators.required]],
      DNI: ['', [Validators.required]],
      Direccion: ['', [Validators.required]],
      Fecha: ['', [Validators.required]],
      Telefono: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      imagen:'assets/Logo-usuario.jpeg'
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  irRegister(dataRegister: any) {
    console.log(dataRegister);
    this.authService.register(dataRegister).subscribe({
      next: (rta: any) => {
        alert('Credenciales correctas!!!');
        console.log('Exito: ', rta);
        this.router.navigateByUrl('home');
      },
      error: (err: any) => {
        alert('Usuario o contraseña incorrecta.');
        console.log('Error: ', err);
      },
      complete: () => {
        console.log('Finalizo');
      }
    });
  }

  submit() {
    console.log('Datos del formulario: ', this.userForm.value);
    if (this.userForm.valid) {
      console.log('Datos del formulario: ', this.userForm.value);
      console.log('Contraseña: '+this.userForm.value.password);
      this.irRegister(this.userForm.value);
    } else {
      alert('Los valores son requeridos');
    }
  }
}
