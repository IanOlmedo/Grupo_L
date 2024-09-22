import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { VerLibroComponent } from './pages/ver-libro/ver-libro.component';
import { CatalogoComponent } from './pages/catalogo/catalogo.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { AbmComponent } from './components/abm/abm.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { PrestamosComponent } from './pages/prestamos/prestamos.component';
import { LoginComponent } from './pages/login/login.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { RegisterComponent } from './pages/register/register.component';
import { AcercaDeComponent } from './pages/acerca-de/acerca-de.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    VerLibroComponent,
    CatalogoComponent,
    SearchBarComponent,
    AbmComponent,
    UsuariosComponent,
    PrestamosComponent,
    LoginComponent,
    ErrorPageComponent,
    RegisterComponent,
    AcercaDeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }