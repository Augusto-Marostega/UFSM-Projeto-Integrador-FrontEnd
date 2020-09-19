import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DoceService } from 'src/app/shared/services/doce.service';
import { CarrinhoService } from 'src/app/shared/services/carrinho.service';
import { DoceQtd } from 'src/app/shared/models/doceQtd.model';
import { Doce } from 'src/app/shared/models/doce.model';
import { ThrowStmt } from '@angular/compiler';
import { EncomendaService } from 'src/app/shared/services/encomenda.service';
import { Encomenda } from 'src/app/shared/models/encomenda.model';
import { Encomenda_doce } from 'src/app/shared/models/encomenda_doce.model';
import { Cliente } from 'src/app/shared/models/cliente.model';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {

  erro: boolean;
  sucess: boolean;
  msg: string;

  public doces: DoceQtd[];
  public doce: Doce;
  public carrinho: DoceQtd[];
  public quantidadeTotal: number;
  public precoTotal: number;

  constructor(private rotaAtiva: ActivatedRoute,
    private doceService: DoceService,
    private carrinhoService: CarrinhoService,
    private encomendaService: EncomendaService,
    private rota: Router) { }

  ngOnInit(): void {
    this.erro = false;
    this.sucess = false;
    this.msg = '';
    this.doces = [];
    this.quantidadeTotal = 0;
    this.precoTotal = 0;

    this.carrinho = this.carrinhoService.getCarrinho();

    this.carrinho.forEach(element => {
      this.doceService.getDoce(element.id).subscribe(dados => {
        let dado: DoceQtd;
        dado = dados;
        dado.quantidade = element.quantidade;
        
        this.doces.push(dado);
        this.atualizarQtdPrecoTotal();
      });
    });

  }

  atualizarCarrinho(){
    this.carrinho = this.carrinhoService.getCarrinho();
    this.doces = [];

    this.carrinho.forEach(element => {
      this.doceService.getDoce(element.id).subscribe(dados => {
        let dado: DoceQtd;
        dado = dados;
        dado.quantidade = element.quantidade;
        
        this.doces.push(dado);
        this.atualizarQtdPrecoTotal();
      });
    });
  }

  atualizarQtdPrecoTotal(){
    let quantidadeTotal = 0;
    let precoTotal = 0;
    this.doces.forEach(element => {
      quantidadeTotal = quantidadeTotal + element.quantidade;
      precoTotal = precoTotal + (element.preco * element.quantidade);
    })
    this.quantidadeTotal = quantidadeTotal;
    this.precoTotal = precoTotal
  }

  verificarQuantidade(quantidade: number, doce?: DoceQtd) {
    if (Number.isNaN(quantidade)) {
      quantidade = 5;
    }
    if (quantidade < 5) {
      quantidade = 5;
    }
    if (quantidade > 1000) {
      quantidade = 1000;
    }
    doce.quantidade = quantidade;
    this.carrinhoService.editDoceCar(doce);
    this.atualizarQtdPrecoTotal();
    return quantidade;
  }

  addQuantidade(quantidade: number, doce: DoceQtd) {
    quantidade = quantidade + 5;
    quantidade = this.verificarQuantidade(quantidade, doce);
    return quantidade;
  }
  remQuantidade(quantidade: number, doce: DoceQtd) {
    quantidade = quantidade - 5;
    quantidade = this.verificarQuantidade(quantidade, doce);
    return quantidade;
  }

  removerItemCarrinho(doce: DoceQtd){
    this.carrinhoService.remDoceCar(doce);
    this.atualizarCarrinho();
    window.location.reload();
  }

  encomendarConfirmar() {
    let novaEncomenda: Encomenda;
    novaEncomenda = new Encomenda();
    novaEncomenda.encomenda_doces = [];

    let cliente: Cliente;
    cliente = new Cliente();
    cliente.id = Number.parseInt(sessionStorage.getItem('id'));
    novaEncomenda.cliente = cliente;


    this.doces.forEach(element => {

      let encomenda_doce: Encomenda_doce;
      encomenda_doce = new Encomenda_doce;
      encomenda_doce.doce = new Doce();

      encomenda_doce.doce = element;
      encomenda_doce.preco_un = element.preco;
      encomenda_doce.quantidade = element.quantidade;

      novaEncomenda.encomenda_doces.push(encomenda_doce);
      
    });
    console.log(novaEncomenda);
    

    this.encomendaService.cadastrar(novaEncomenda).subscribe(
      sucess => {
        this.erro = false;
        this.sucess = true;

        
        //window.location.reload();
        this.msg = 'Encomenda feita com sucesso';
        alert('Encomenda feita com sucesso');

        this.carrinhoService.clearCarrinho();
         this.rota.navigate(['/cliente/encomendas']);
      },
      error => {
        this.sucess = false;
        this.erro = true;
        this.msg = 'Erro ao fazer encomenda.'
        alert('Erro ao fazer encomenda.');
      } 
    )
  }

}
