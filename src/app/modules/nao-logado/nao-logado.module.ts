import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NaoLogadoRoutingModule } from './nao-logado.routing';
import { FormsModule } from '@angular/forms';
import { CadastrarSeComponent } from './cadastrar-se/cadastrar-se.component';
import { DocesComponent } from './doces/doces.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NaoLogadoComponent } from './nao-logado.component';
import { TextMaskModule } from 'angular2-text-mask';
import { FilterPipeDoceByNameModule } from 'src/app/shared/pipes/filterDoceByNamePipe.module';

@NgModule({
  declarations: [
    CadastrarSeComponent,
    DocesComponent,
    LoginComponent,
    NavbarComponent,
    NaoLogadoComponent
  ],
  imports: [
    CommonModule,
    NaoLogadoRoutingModule,
    FormsModule,
    TextMaskModule,
    FilterPipeDoceByNameModule
  ]
})
export class NaoLogadoModule { }
