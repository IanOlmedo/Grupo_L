import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
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
import { PresSPComponent } from './components/pres-s-p/pres-s-p.component';
import { PresUserRComponent } from './components/pres-user-r/pres-user-r.component';
import { PresAdminComponent } from './components/pres-admin/pres-admin.component';
import { AltaUsuariosComponent } from './pages/alta-usuarios/alta-usuarios.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { StockComponent } from './pages/stock/stock.component';

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
    PresSPComponent,
    PresUserRComponent,
    PresAdminComponent,
    AltaUsuariosComponent,
    CarritoComponent,
    StockComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
