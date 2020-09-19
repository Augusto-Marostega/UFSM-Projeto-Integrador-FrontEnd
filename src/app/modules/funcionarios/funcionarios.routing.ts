import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FuncionariosComponent } from './funcionarios.component';
import { EditFuncComponent } from './edit-func/edit-func.component';
import { FuncionarioAuthGuard } from 'src/app/shared/guards/funcionario.auth.guard';
import { DocesComponent } from './doces/doces.component';
import { IngredientesComponent } from './ingredientes/ingredientes.component';
import { CadIngredienteComponent } from './ingredientes/cad-ingrediente/cad-ingrediente.component';
import { EditIngredienteComponent } from './ingredientes/edit-ingrediente/edit-ingrediente.component';
import { CadDoceComponent } from './doces/cad-doce/cad-doce.component';
import { EditDoceComponent } from './doces/edit-doce/edit-doce.component';
import { EncomendasComponent } from './encomendas/encomendas.component';
import { DetalhesComponent } from './encomendas/detalhes/detalhes.component';


const funcionariosRoutes: Routes = [
  {
    path: 'funcionario', component: FuncionariosComponent,
    canActivate: [FuncionarioAuthGuard],
    children: [
      { path: 'editFuncionario', component: EditFuncComponent},
      { path: 'doces', component: DocesComponent },
      { path: 'doces/cad-doce', component: CadDoceComponent },
      { path: 'doces/edit-doce/:idDoce', component: EditDoceComponent },
      { path: 'ingredientes', component: IngredientesComponent },
      { path: 'ingredientes/cad-ingrediente', component: CadIngredienteComponent},
      { path: 'ingredientes/edit-ingrediente/:idIngrediente', component: EditIngredienteComponent},
      { path: 'encomendas', component: EncomendasComponent },
      { path: 'encomendas/detalhes/:idEnco', component: DetalhesComponent },
      { path: '', redirectTo:'doces', pathMatch:'full' },
      { path: '**', redirectTo:'doces', pathMatch:'full' } //notefound
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(funcionariosRoutes)],
  exports: [RouterModule]
})

export class FuncionariosRoutingModule { }