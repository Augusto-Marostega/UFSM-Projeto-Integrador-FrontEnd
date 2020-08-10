import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Doce } from 'src/app/shared/models/doce.model';
import { DoceService } from 'src/app/shared/services/doce.service';

@Component({
  selector: 'app-doces',
  templateUrl: './doces.component.html',
  styleUrls: ['./doces.component.css']
})
export class DocesComponent implements OnInit {

  


  //title = 'angular-text-search-highlight';
  searchText = '';

  public doces: Doce[];

  constructor(private rotaAtiva: ActivatedRoute,
    private doceService: DoceService,
    private rota: Router) { }

  erro: boolean;
  sucess: boolean;
  msg: string;


  ngOnInit(): void {

    this.erro = false;
    this.sucess = false;
    this.msg = '';

    this.doceService.getDoces().subscribe(dados => {
      this.doces = dados;
    });


  }

  teste() {
    console.log(this.doces);
  }

  atualizarLista() {
    this.doceService.getDoces().subscribe(dados => {
      this.doces = dados;
    });
  }


  excluirConfirmar(doce) {
    console.log(doce);
    if (window.confirm('Tem certeza que deseja excluir o doce "' + doce.nome + '" ?')) {
      this.excluirDoce(doce);
    }
  }

  excluirDoce(doce) {

    this.doceService.deletar(doce.id)
      .subscribe(
        sucess => {
          this.erro = false;
          this.sucess = true;
          this.msg = 'Doce "' + doce.nome + '" excluído com sucesso';
          alert('Doce "' + doce.nome + '" excluído com sucesso');
          this.atualizarLista();

        },
        error => {
          this.sucess = false;
          this.erro = true;
          this.msg = 'Erro ao excluir Doce.';
          alert('Erro ao excluir Doce.');
        }
      )

  }


}
