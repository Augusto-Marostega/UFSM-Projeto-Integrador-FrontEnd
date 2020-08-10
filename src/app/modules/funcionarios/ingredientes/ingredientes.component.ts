import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IngredienteService } from 'src/app/shared/services/ingrediente.service';
import { Ingrediente } from 'src/app/shared/models/ingrediente.model';

@Component({
  selector: 'app-ingredientes',
  templateUrl: './ingredientes.component.html',
  styleUrls: ['./ingredientes.component.css']
})
export class IngredientesComponent implements OnInit {

  constructor(
    private ingredienteService: IngredienteService,
    private rota: Router
  ) { }

  public ingredientes: Ingrediente[];

  erro: boolean;
  sucess: boolean;
  msg: string;
  searchText = '';


  ngOnInit(): void {

    this.erro = false;
    this.sucess = false;
    this.msg = '';
    
    this.ingredienteService.getIngredientes().subscribe(dados => {
      this.ingredientes = dados;
    });
    
  }

  atualizarLista(){
    this.ingredienteService.getIngredientes().subscribe(dados => {
      this.ingredientes = dados;
    });
  }


  excluirConfirmar(ingrediente){
    console.log(ingrediente);
    if(window.confirm('Tem certeza que deseja excluir o ingrediente "' + ingrediente.nome + '" ?')){
      this.excluirIngrediente(ingrediente);
    }
  }

  excluirIngrediente(ingrediente){

    this.ingredienteService.deletar(ingrediente.id)
    .subscribe(
      sucess => { 
        this.erro = false;
        this.sucess = true;
        this.msg = 'Ingrediente "' + ingrediente.nome + '" excluído com sucesso';
        alert('Ingrediente excluído com sucesso');
        this.atualizarLista();

      },
      error => {
        this.sucess = false;
        this.erro = true;
        this.msg = 'Erro ao excluir ingrediente.';
        alert('Erro ao excluir ingrediente.');
      }
    )

  }

}
