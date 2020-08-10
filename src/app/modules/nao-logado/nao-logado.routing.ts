import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastrarSeComponent } from './cadastrar-se/cadastrar-se.component';
import { LoginComponent } from './login/login.component';
import { DocesComponent } from './doces/doces.component';
import { NaoLogadoComponent } from './nao-logado.component';
import { NaoLogadoAuthGuard } from 'src/app/shared/guards/naoLogado.auth.guard';


const routes: Routes = [
  { path: '', component: NaoLogadoComponent,
  canActivate:[NaoLogadoAuthGuard],
    children:[ 
      { path: 'login', component: LoginComponent },
      { path: 'cadastrar-se', component: CadastrarSeComponent },
      { path: 'doces', component: DocesComponent},
      { path: '', redirectTo:'doces', pathMatch:'full' },
      { path: '**', redirectTo:'doces', pathMatch:'full' } //notefound
    ]}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NaoLogadoRoutingModule { }
