import { Component, OnInit } from '@angular/core';
import { Ingrediente } from 'src/app/shared/models/ingrediente.model';
import { Router, ActivatedRoute } from '@angular/router';
import { IngredienteService } from 'src/app/shared/services/ingrediente.service';
import { Doce } from 'src/app/shared/models/doce.model';
import { DoceService } from 'src/app/shared/services/doce.service';

@Component({
  selector: 'app-cad-doce',
  templateUrl: './cad-doce.component.html',
  styleUrls: ['./cad-doce.component.css']
})
export class CadDoceComponent implements OnInit {


  //public ingrediente: Ingrediente;
  public ingredientes: Ingrediente[] = [];
  public ingredientesSemSelecao: Ingrediente[] = [];
  public ingredientesComSelecao: Ingrediente[] = [];
  public doce: Doce;
  public ingredienteId;

  erro: boolean;
  sucess: boolean;
  msg: string;

  constructor(private rotaAtiva: ActivatedRoute,
    private ingredienteService: IngredienteService,
    private doceService: DoceService,
    private rota: Router) { }

  ngOnInit(): void {

    this.ingredienteId = 0;
    this.erro = false;
    this.sucess = false;
    this.msg = '';
    this.doce = new Doce();

    this.ingredienteService.getIngredientes().subscribe(dados => {
      this.ingredientes = Array.from(dados);
      this.ingredientesSemSelecao = Array.from(dados);
    });
    this.limparDoce();

  }

  onChangeSelect(id) {
    console.log(id);
    if (id > 0 || id != null) {
      var ingrediente = this.ingredientes.filter(ingre => ingre.id == id)[0];
      if (ingrediente != null)
        this.adicionarIngrediente('comSelecao', ingrediente);
    }
  }

  onRemoveSelect(id) {
    console.log(id);
    if (id > 0 || id != null) {
      var ingrediente = this.ingredientes.filter(ingre => ingre.id == id)[0];
      if (ingrediente != null)
        this.adicionarIngrediente('semSelecao', ingrediente);
    }
  }

  adicionarIngrediente(lista: string, ingrediente: Ingrediente) {

    if (lista === 'comSelecao' && (ingrediente.id > 0 || ingrediente.id != null)) {
      this.ingredientesComSelecao.push(ingrediente);
      this.removerIngrediente('semSelecao', ingrediente);
    }
    else if (lista == 'semSelecao' && (ingrediente.id > 0 || ingrediente.id != null)) {
      this.ingredientesSemSelecao.push(ingrediente);
      this.removerIngrediente('comSelecao', ingrediente);
    }


  }

  removerIngrediente(lista: string, ingrediente: Ingrediente) {

    if (lista === 'comSelecao' && (ingrediente.id > 0 || ingrediente.id != null)) {
      for (var i = 0; i < this.ingredientesComSelecao.length; i++) {
        if (this.ingredientesComSelecao[i].id == ingrediente.id) {
          this.ingredientesComSelecao.splice(i, 1);
          break;
        }
      }

    }
    else if (lista == 'semSelecao' && (ingrediente.id > 0 || ingrediente.id != null)) {
      for (var i = 0; i < this.ingredientesSemSelecao.length; i++) {
        if (this.ingredientesSemSelecao[i].id == ingrediente.id) {
          this.ingredientesSemSelecao.splice(i, 1);
          break;
        }
      }

    }
  }


  limparDoce() {
    this.doce.nome = '';
    this.doce.descricao = '';
    this.doce.peso = null;
    this.doce.foto = '';
    this.doce.preco = null;
  }


  cadastrar() {

    console.log(this.doce.peso >= 1);

    if (this.doce.nome.length >= 4 && this.doce.descricao.length >= 4 &&
      this.doce.peso >= 1 && this.doce.peso != null &&
      this.doce.foto.length >= 4 && this.doce.preco != null && this.doce.preco >= 0.10) {

      this.doce.ingredientes = this.ingredientesComSelecao;
      console.log(this.doce);

      this.doceService.cadastrar(this.doce)
        .subscribe(
          success => {
            this.erro = false;
            this.sucess = true;
            this.msg = 'Doce "' + this.doce.nome + '" cadastrado com sucesso';
            alert('Doce "' + this.doce.nome + '" cadastrado com sucesso!'); this.limparDoce();
          },
          error => {
            this.sucess = false;
            this.erro = true;
            this.msg = 'Erro ao cadastrar doce "' + this.doce.nome + '".'
            alert('Erro ao cadastrar doce "' + this.doce.nome + '".');
          }
        )
    } else {
      this.erro = true;
      this.sucess = false;
      this.msg = 'Erro ao cadastrar doce "' + this.doce.nome + '", todos os campos säo obrigatórios, precisam ter pelo menos 4 digitos e o preço precisa ser igual ou maior que R$: 0,10.';
    }
  }

}
