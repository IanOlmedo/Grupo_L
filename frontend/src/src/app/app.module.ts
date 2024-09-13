import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { VerLibroComponent } from './pages/ver-libro/ver-libro.component';
import { CatalogoComponent } from './pages/catalogo/catalogo.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    VerLibroComponent,
    CatalogoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
