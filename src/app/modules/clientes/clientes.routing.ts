import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditCliComponent } from './edit-cli/edit-cli.component';
import { ClientesComponent } from './clientes.component';
import { ClienteAuthGuard } from 'src/app/shared/guards/cliente.auth.guard';
import { DocesComponent } from './doces/doces.component';
import { EncomendasComponent } from './encomendas/encomendas.component';
import { CarrinhoComponent } from './carrinho/carrinho.component';


const clientesRoutes: Routes = [
    { path: 'cliente', component: ClientesComponent,
    canActivate: [ClienteAuthGuard],
      children: [
        { path: 'editCliente', component: EditCliComponent},
        { path: 'doces', component: DocesComponent},
        { path: 'encomendas', component: EncomendasComponent},
        { path: 'carrinho', component: CarrinhoComponent },
        { path: '', redirectTo:'doces', pathMatch:'full' },
        { path: '**', redirectTo:'doces', pathMatch:'full' } //notefound
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(clientesRoutes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
