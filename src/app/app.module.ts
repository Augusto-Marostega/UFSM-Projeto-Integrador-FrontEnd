import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ClientesModule } from './modules/clientes/clientes.module';
import { FuncionariosModule } from './modules/funcionarios/funcionarios.module';
import { NavbarModule } from './modules/navbar/navbar.module';
import { HttpClientModule } from '@angular/common/http';
import { NaoLogadoModule } from './modules/nao-logado/nao-logado.module';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ClientesModule,
    FuncionariosModule,
    NavbarModule,
    NaoLogadoModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
