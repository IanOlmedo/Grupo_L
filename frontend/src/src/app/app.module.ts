import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { VerLibroComponent } from './pages/ver-libro/ver-libro.component';
import { CatalogoComponent } from './pages/catalogo/catalogo.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { PrestamosComponent } from './pages/prestamos/prestamos.component';
import { LoginComponent } from './pages/login/login.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { RegisterComponent } from './pages/register/register.component';
import { AcercaDeComponent } from './pages/acerca-de/acerca-de.component';
import { RedesSocialesComponent } from './components/redes-sociales/redes-sociales.component';
import { IconoUsuarioComponent } from './components/icono-usuario/icono-usuario.component';
import { AltaUsuariosComponent } from './pages/alta-usuarios/alta-usuarios.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { StockComponent } from './pages/stock/stock.component';
import { VerUserComponent } from './components/usuarios/ver-user/ver-user.component';
import { AbmComponent } from './components/usuarios/abm/abm.component';
import { AgregarUsuarioComponent } from './pages/agregar-usuario/agregar-usuario.component';
import { ValoracionesComponent } from './pages/valoraciones/valoraciones.component';
import { PrestamosAdminComponent } from './components/prestamos-admin/prestamos-admin.component';
import { PrestamosUserComponent } from './components/prestamos-user/prestamos-user.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    VerLibroComponent,
    CatalogoComponent,
    SearchBarComponent,
    UsuariosComponent,
    PrestamosComponent,
    LoginComponent,
    ErrorPageComponent,
    RegisterComponent,
    AcercaDeComponent,
    RedesSocialesComponent,
    IconoUsuarioComponent,
    AltaUsuariosComponent,
    CarritoComponent,
    StockComponent,
    VerUserComponent,
    AbmComponent,
    AgregarUsuarioComponent,
    ValoracionesComponent,
    PrestamosAdminComponent,
    PrestamosUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
