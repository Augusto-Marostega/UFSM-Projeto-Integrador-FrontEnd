import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { IngredienteService } from 'src/app/shared/services/ingrediente.service';
import { DoceService } from 'src/app/shared/services/doce.service';
import { Ingrediente } from 'src/app/shared/models/ingrediente.model';
import { Doce } from 'src/app/shared/models/doce.model';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-edit-doce',
  templateUrl: './edit-doce.component.html',
  styleUrls: ['./edit-doce.component.css']
})
export class EditDoceComponent implements OnInit {

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

    this.rotaAtiva.paramMap.pipe(switchMap((params: ParamMap) => this.doceService.getDoce(params.get('idDoce'))))
      .subscribe((dados) => {
        this.doce = dados;
        this.ingredientesComSelecao = Array.from(this.doce.ingredientes);
        this.ingredienteService.getIngredientes().subscribe(dados => {
          this.ingredientes = Array.from(dados);
          this.ingredientesSemSelecao = Array.from(dados);
          this.ingredientesComSelecao.forEach(ingres => {

                this.removerIngrediente('semSelecao', ingres);

          });
        });
      });

  }

  addIngredienteSemSelecao() {
    //add no array this.ingredientesSemSelecao o(s) ingrediente(s) do array this.ingredientes (todos ingredientes) que não esta no array
    //this.doce.ingredientes (ingredientes do doce)



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

  editar() {
    console.log('teste');

    if (this.doce.nome.length >= 4 && this.doce.descricao.length >= 4 &&
      this.doce.peso >= 1 && this.doce.peso != null &&
      this.doce.foto.length >= 4 && this.doce.preco != null && this.doce.preco >= 1) {

      this.doce.ingredientes = this.ingredientesComSelecao;
      console.log(this.doce);

      this.doceService.editar(this.doce)
        .subscribe(
          success => {
            this.erro = false;
            this.sucess = true;
            this.msg = 'Doce "' + this.doce.nome + '" editado com sucesso';
            alert('Doce "' + this.doce.nome + '" editado com sucesso!');
          },
          error => {
            this.sucess = false;
            this.erro = true;
            this.msg = 'Erro ao editar doce "' + this.doce.nome + '".'
            alert('Erro ao editar doce "' + this.doce.nome + '".');
          }
        )
    } else {
      this.erro = true;
      this.sucess = false;
      this.msg = 'Erro ao editar doce "' + this.doce.nome + '", todos os campos säo obrigatórios e precisam ter pelo menos 4 digitos.';
    }
  }



}
