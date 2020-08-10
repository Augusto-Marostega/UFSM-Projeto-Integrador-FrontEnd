import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { IngredienteService } from 'src/app/shared/services/ingrediente.service';
import { Ingrediente } from 'src/app/shared/models/ingrediente.model';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-edit-ingrediente',
  templateUrl: './edit-ingrediente.component.html',
  styleUrls: ['./edit-ingrediente.component.css']
})
export class EditIngredienteComponent implements OnInit {

  constructor(private rotaAtiva: ActivatedRoute, private rota: Router, private ingredienteService: IngredienteService) { }

  public ingrediente: Ingrediente;

  erro: boolean;
  sucess: boolean;
  msg: string;


  ngOnInit(): void {
    this.erro = false;
    this.sucess = false;
    this.msg = '';
    this.ingrediente = new Ingrediente();

    this.rotaAtiva.paramMap.pipe(switchMap((params: ParamMap) => this.ingredienteService.getIngrediente(params.get('idIngrediente'))))
      .subscribe((dados) => this.ingrediente = dados);

  }

  editarIngrediente() {
    if (this.ingrediente.nome.length >= 4 && this.ingrediente.descricao.length >= 4) {
      this.ingredienteService.editar(this.ingrediente)
        .subscribe(
          success => {
            this.erro = false;
            this.sucess = true;
            this.msg = 'Ingrediente "' + this.ingrediente.nome + '" editado com sucesso';
            alert('Ingrediente "' + this.ingrediente.nome + '" editado com sucesso!');
            /* this.router.navigate(['/dono/funcionario']) */
          },
          error => {
            this.sucess = false;
            this.erro = true;
            this.msg = 'Erro ao editar ingrediente "' + this.ingrediente.nome + '".'

            alert('Erro ao editar ingrediente "' + this.ingrediente.nome + '".');
          }
        )
    } else {
      this.erro = true;
      this.sucess = false;
      this.msg = 'Erro ao editar ingrediente "' + this.ingrediente.nome + '", todos os campos säo obrigatórios e precisam ter pelo menos 3 digitos.';
    }
  }

  



}
