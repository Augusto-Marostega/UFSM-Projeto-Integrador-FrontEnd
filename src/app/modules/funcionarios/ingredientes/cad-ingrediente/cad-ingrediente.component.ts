import { Component, OnInit } from '@angular/core';
import { Ingrediente } from 'src/app/shared/models/ingrediente.model';
import { Router, ActivatedRoute } from '@angular/router';
import { IngredienteService } from 'src/app/shared/services/ingrediente.service';

@Component({
  selector: 'app-cad-ingrediente',
  templateUrl: './cad-ingrediente.component.html',
  styleUrls: ['./cad-ingrediente.component.css']
})
export class CadIngredienteComponent implements OnInit {

  public ingrediente: Ingrediente;

  erro: boolean;
  sucess: boolean;
  msg: string;

  constructor(private rotaAtiva: ActivatedRoute,
    private ingredienteService: IngredienteService,
    private rota: Router,

  ) { }

  ngOnInit(): void {

    this.erro = false;
    this.sucess = false;
    this.msg = '';

    this.ingrediente = new Ingrediente();
    this.limparIngrediente();
  }

  limparIngrediente() {
    this.ingrediente.descricao = '';
    this.ingrediente.nome = '';
  }

  cadastrar() {

    console.log(this.ingrediente);

    if (this.ingrediente.nome.length >= 4 && this.ingrediente.descricao.length >= 4) {

      this.ingredienteService.cadastrar(this.ingrediente)
        .subscribe(
          success => {
            this.erro = false;
            this.sucess = true;
            this.msg = 'Ingrediente "' + this.ingrediente.nome + '" cadastrado com sucesso';
            alert('Ingrediente "' + this.ingrediente.nome + '" cadastrado com sucesso!'); this.limparIngrediente();
          },
          error => {
            this.sucess = false;
            this.erro = true;
            this.msg = 'Erro ao cadastrar ingrediente "' + this.ingrediente.nome + '".'
            alert('Erro ao cadastrar ingrediente "' + this.ingrediente.nome + '".');
          }
        )
    } else {
      this.erro = true;
      this.sucess = false;
      this.msg = 'Erro ao cadastrar ingrediente "' + this.ingrediente.nome + '", todos os campos säo obrigatórios e precisam ter pelo menos 3 digitos.';
    }
  }

}
