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
import { AltaUsuariosComponent } from './pages/alta-usuarios/alta-usuarios.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { StockComponent } from './pages/stock/stock.component';
import { authsessionGuard } from './guards/authsession.guard';
import { authroleGuard } from './guards/authrole.guard';
import { AgregarUsuarioComponent } from './pages/agregar-usuario/agregar-usuario.component';
import { ValoracionesComponent } from './pages/valoraciones/valoraciones.component';
import { InfoPrestamoComponent } from './pages/info-prestamo/info-prestamo.component';
import { AltaLibrosComponent } from './pages/alta-libros/alta-libros.component';
import { AltaAutoresComponent } from './pages/alta-autores/alta-autores.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'home/:id', component: HomeComponent},
  {path: 'catalogo', component: CatalogoComponent},
  {path: 'catalogo/:id', component: CatalogoComponent},
  {path: 'ver_libro', component: VerLibroComponent},
  {path: 'ver_libro/:id', component: VerLibroComponent},
  {path: 'alta_libros', component: AltaLibrosComponent, canActivate:[authsessionGuard, authroleGuard]},
  {path: 'alta_libros/:id', component: AltaLibrosComponent, canActivate:[authsessionGuard, authroleGuard]},
  {path: 'alta_autores', component: AltaAutoresComponent, canActivate:[authsessionGuard, authroleGuard]},
  {path: 'alta_autores/:id', component: AltaAutoresComponent, canActivate:[authsessionGuard, authroleGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'info_usuario/:id', component: UsuariosComponent,canActivate:[authsessionGuard]},
  {path: 'info_prestamo/:id', component: InfoPrestamoComponent },
  {path: 'prestamos', component: PrestamosComponent},
  {path: 'prestamos/:id', component: PrestamosComponent},
  {path: 'acerca_de', component: AcercaDeComponent},
  {path: 'acerca_de/:id', component: AcercaDeComponent},
  {path: 'agregar_usuario', component: AgregarUsuarioComponent},
  {path: 'agregar_usuario/:id', component: AgregarUsuarioComponent, canActivate:[authsessionGuard, authroleGuard]},
  {path: 'alta_usuarios', component: AltaUsuariosComponent},
  {path: 'alta_usuarios/:id', component: AltaUsuariosComponent, canActivate:[authsessionGuard, authroleGuard]},
  {path: 'error_page', component: ErrorPageComponent},
  {path: 'carrito/:id', component: CarritoComponent,canActivate:[authsessionGuard]},
  {path: 'stock', component: StockComponent,canActivate:[authsessionGuard, authroleGuard]},
  {path: 'valoraciones/:id', component: ValoracionesComponent},

  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', redirectTo: '/error_page'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
