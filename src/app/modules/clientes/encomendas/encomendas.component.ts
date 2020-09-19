import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/shared/services/cliente.service';
import { EncomendaService } from 'src/app/shared/services/encomenda.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DoceService } from 'src/app/shared/services/doce.service';
import { DoceQtd } from 'src/app/shared/models/doceQtd.model';
import { Doce } from 'src/app/shared/models/doce.model';
import { Cliente } from 'src/app/shared/models/cliente.model';
import { Encomenda_doce } from 'src/app/shared/models/encomenda_doce.model';
import { Encomenda_estado } from 'src/app/shared/models/encomenda_estado.model';

@Component({
  selector: 'app-encomendas',
  templateUrl: './encomendas.component.html',
  styleUrls: ['./encomendas.component.css']
})
export class EncomendasComponent implements OnInit {


  erro: boolean;
  sucess: boolean;
  msg: string;

  public doces: DoceQtd[];
  public doce: Doce;
  public carrinho: DoceQtd[];
  public quantidadeTotal: number;
  public precoTotal: number;

  

  cliente: Cliente = new Cliente();

  constructor(private rotaAtiva: ActivatedRoute,
    private doceService: DoceService,
    private encomendaService: EncomendaService,
    private clienteService: ClienteService,
    private rota: Router) { }

  ngOnInit(): void {


    this.clienteService.getCliente(Number.parseInt(sessionStorage.getItem('id')))
        .subscribe(dados => this.cliente = dados);
  }

  getUltimoEstado(encomenda_estados: Encomenda_estado[]){
    let estado: string;
    if(encomenda_estados.length ==0){
      estado = 'Pendente.';
    }
    encomenda_estados.forEach(element => {
      estado = element.estado;
    });
    return estado;                 
  }


  getQtdTotal(val: Encomenda_doce[]):number{
    let sum: number = 0;
    
    if(val!=undefined){
      val.forEach(element => {
        sum = Number(sum) + Number(element.quantidade);
      });   
    }
    return sum;
  }

  getPrecoTotal(val: Encomenda_doce[]):number{
    let sum: number = 0;
    if(val!=undefined){
      val.forEach(element => {
        sum = Number(sum) + (Number(element.quantidade) * Number(element.preco_un));
      });   
    }
    return sum;
  }

}
