import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CatalogoComponent } from './pages/catalogo/catalogo.component';
import { VerLibroComponent } from './pages/ver-libro/ver-libro.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { PrestamosComponent } from './pages/prestamos/prestamos.component';
import { AcercaDeComponent } from './pages/acerca-de/acerca-de.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'home/:id/:rol', component: HomeComponent},

  {path: 'catalogo', component: CatalogoComponent},
  {path: 'catalogo/:id/:rol', component: CatalogoComponent},

  {path: 'ver_libro/:id/:rol', component: VerLibroComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'info_usuario/:id/:rol', component: UsuariosComponent},
  {path: 'prestamos_user', component: PrestamosComponent},
  {path: 'acerca_de', component: AcercaDeComponent},
  {path: 'error_page', component: ErrorPageComponent},

  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', redirectTo: '/error_page'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
