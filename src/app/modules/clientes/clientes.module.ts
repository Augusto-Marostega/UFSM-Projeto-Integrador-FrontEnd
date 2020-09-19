import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientesComponent } from './clientes.component';
import { EditCliComponent } from './edit-cli/edit-cli.component';
import { ClientesRoutingModule } from './clientes.routing';
import { FormsModule } from '@angular/forms';
import { DocesComponent } from './doces/doces.component';
import { EncomendasComponent } from './encomendas/encomendas.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TextMaskModule } from 'angular2-text-mask';
import { FilterPipeDoceByNameModule } from 'src/app/shared/pipes/filterDoceByNamePipe.module';
import { CarrinhoComponent } from './carrinho/carrinho.component';
import { DetalhesComponent } from './encomendas/detalhes/detalhes.component';

 



@NgModule({
  declarations: [
    ClientesComponent,
    EditCliComponent,
    DocesComponent,
    EncomendasComponent,
    NavbarComponent,
    CarrinhoComponent,
    DetalhesComponent
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    FormsModule,
    TextMaskModule,
    FilterPipeDoceByNameModule
  ]
})
export class ClientesModule { }
