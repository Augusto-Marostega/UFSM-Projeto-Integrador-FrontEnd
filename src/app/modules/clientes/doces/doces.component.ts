import { Component, OnInit } from '@angular/core';
import { Doce } from 'src/app/shared/models/doce.model';
import { ActivatedRoute, Router } from '@angular/router';
import { DoceService } from 'src/app/shared/services/doce.service';
import { DoceQtd } from 'src/app/shared/models/doceQtd.model';

@Component({
  selector: 'app-doces',
  templateUrl: './doces.component.html',
  styleUrls: ['./doces.component.css']
})
export class DocesComponent implements OnInit {


  //title = 'angular-text-search-highlight';
  searchText = '';



  public doces: DoceQtd[];

  constructor(private rotaAtiva: ActivatedRoute,
    private doceService: DoceService,
    private rota: Router) { }

  erro: boolean;
  sucess: boolean;
  msg: string;
  //quantidade: number;

  ngOnInit(): void {

    this.erro = false;
    this.sucess = false;
    this.msg = '';

    //this.quantidade = 5;

    this.doceService.getDoces().subscribe(dados => {
      this.doces = dados;
      this.doces.forEach(element => {
        element.quantidade = 5;
      });
    });


  }

  verificarQuantidade(quantidade: number) {
    if (Number.isNaN(quantidade)) {
      quantidade = 5;
    }
    if (quantidade < 5) {
      quantidade = 5;
    }
    if (quantidade > 1000) {
      quantidade = 1000;
    }
    return quantidade;
  }

  addQuantidade(quantidade: number) {
    quantidade = quantidade + 5;
    quantidade = this.verificarQuantidade(quantidade);
    return quantidade;
  }
  remQuantidade(quantidade: number) {
    quantidade = quantidade - 5;
    quantidade = this.verificarQuantidade(quantidade);
    return quantidade;
  }

  teste() {
    console.log(this.doces);
  }

  atualizarLista() {
    this.doceService.getDoces().subscribe(dados => {
      this.doces = dados;
    });
  }


  encomendarConfirmar(doce) {
    console.log(doce);
    return;
    if (window.confirm('Tem certeza que deseja excluir o doce "' + doce.nome + '" ?')) {
      this.addDoceCarrinho(doce);
    }
  }

  addDoceCarrinho(doce: DoceQtd) {


    //sessionStorage.setItem('carrinho', doce);

    


    return;

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
