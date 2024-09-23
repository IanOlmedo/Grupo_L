import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CatalogoComponent } from './pages/catalogo/catalogo.component';
import { VerLibroComponent } from './pages/ver-libro/ver-libro.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { PrestamosComponent } from './pages/prestamos/prestamos.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'catalogo', component: CatalogoComponent},
  {path: 'ver_libro/:id/:rol', component: VerLibroComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'info_usuario', component: UsuariosComponent},
  {path: 'prestamos_user', component: PrestamosComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
