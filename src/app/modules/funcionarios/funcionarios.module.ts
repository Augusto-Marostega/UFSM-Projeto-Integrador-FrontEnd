import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FuncionariosComponent } from './funcionarios.component';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { DocesComponent } from './doces/doces.component';
import { EncomendasComponent } from './encomendas/encomendas.component';
import { FuncionariosRoutingModule } from './funcionarios.routing';
import { IngredientesComponent } from './ingredientes/ingredientes.component';
import { CadIngredienteComponent } from './ingredientes/cad-ingrediente/cad-ingrediente.component';
import { EditIngredienteComponent } from './ingredientes/edit-ingrediente/edit-ingrediente.component';
import { CadDoceComponent } from './doces/cad-doce/cad-doce.component';
import { EditDoceComponent } from './doces/edit-doce/edit-doce.component';
import { FilterPipeDoceByNameModule } from 'src/app/shared/pipes/filterDoceByNamePipe.module';
import { EditFuncComponent } from './edit-func/edit-func.component';
import { DetalhesComponent } from './encomendas/detalhes/detalhes.component';



@NgModule({
  declarations: [
    FuncionariosComponent,
    NavbarComponent,
    EditFuncComponent,    
    DocesComponent,
    EncomendasComponent,
    IngredientesComponent,
    CadIngredienteComponent,
    EditIngredienteComponent,
    CadDoceComponent,
    EditDoceComponent,
    DetalhesComponent
  ],
  imports: [
    CommonModule,
    FuncionariosRoutingModule,
    FormsModule,
    FilterPipeDoceByNameModule
  ]
})
export class FuncionariosModule { }
