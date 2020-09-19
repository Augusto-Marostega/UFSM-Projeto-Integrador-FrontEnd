import { Component, OnInit } from '@angular/core';
import { Encomenda } from 'src/app/shared/models/encomenda.model';
import { ActivatedRoute } from '@angular/router';
import { EncomendaService } from 'src/app/shared/services/encomenda.service';
import { Encomenda_doce } from 'src/app/shared/models/encomenda_doce.model';
import { Encomenda_estado } from 'src/app/shared/models/encomenda_estado.model';
import { Funcionario } from 'src/app/shared/models/funcionario.model';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.css']
})
export class DetalhesComponent implements OnInit {

  constructor(private rotaAtiva: ActivatedRoute, private encomendaEstadoService: EncomendaService) { }

  erro: boolean;
  sucess: boolean;
  msg: string;
  verificar: boolean;

  encomenda: Encomenda = new Encomenda();
  encomenda_estado: Encomenda_estado = new Encomenda_estado();
  funcionario: Funcionario = new Funcionario();


  tiposDeEstados: string[] = [];

  ngOnInit(): void {

    this.verificar = true;

    this.encomenda_estado.estado = '0';

    /*
    this.tiposDeEstados.push('Aceito.');
    this.tiposDeEstados.push('Negado.');
    this.tiposDeEstados.push('Em produção.');
    this.tiposDeEstados.push('Aguardado retirada.');
    this.tiposDeEstados.push('Entregue.');
    this.tiposDeEstados.push('Cancelado.');
    */


    this.erro = false;
    this.sucess = false;
    this.msg = '';

    this.encomendaEstadoService.getEncomenda(Number.parseInt(this.rotaAtiva.snapshot.params['idEnco']))
      .subscribe(dados => {
        this.encomenda = dados;
        this.verificarOpcoes();
      });


  }

  verificarOpcoes() {
    this.tiposDeEstados = [];

    if (this.encomenda.encomenda_estados.length == 0) {
      this.tiposDeEstados.push('Aceito.');
      this.tiposDeEstados.push('Negado.');
      this.tiposDeEstados.push('Em produção.');
      this.tiposDeEstados.push('Aguardado retirada.');
      this.tiposDeEstados.push('Entregue.');
      this.tiposDeEstados.push('Cancelado.');
    } else {
      this.encomenda.encomenda_estados.forEach(element => {

        if (element.estado == 'Negado.' || element.estado == 'Entregue.' || element.estado == 'Cancelado.') {
          this.verificar = false;
        }
        if (element.estado == 'Aceito.') {
          this.tiposDeEstados = [];
          this.tiposDeEstados.push('Em produção.');
          this.tiposDeEstados.push('Aguardado retirada.');
          this.tiposDeEstados.push('Entregue.');
          this.tiposDeEstados.push('Cancelado.');
        }
        if (element.estado == 'Em produção.') {
          this.tiposDeEstados = [];
          this.tiposDeEstados.push('Aguardado retirada.');
          this.tiposDeEstados.push('Entregue.');
          this.tiposDeEstados.push('Cancelado.');
        }
        if (element.estado == 'Aguardado retirada.') {
          this.tiposDeEstados = [];
          this.tiposDeEstados.push('Entregue.');
          this.tiposDeEstados.push('Cancelado.');
        }
        if (element.estado == 'Aguardado retirada.') {
          this.tiposDeEstados = [];
          this.tiposDeEstados.push('Entregue.');
          this.tiposDeEstados.push('Cancelado.');
        }
      });
    }

  }

  getQtdTotal(val: Encomenda_doce[]): number {
    let sum: number = 0;

    if (val != undefined) {
      val.forEach(element => {
        sum = Number(sum) + Number(element.quantidade);
      });
    }
    return sum;
  }

  getPrecoTotal(val: Encomenda_doce[]): number {
    let sum: number = 0;
    if (val != undefined) {
      val.forEach(element => {
        sum = Number(sum) + (Number(element.quantidade) * Number(element.preco_un));
      });
    }
    return sum;
  }

  getUltimoEstado(encomenda_estados: Encomenda_estado[]) {
    let estado: string;
    if (encomenda_estados?.length == 0) {
      estado = 'Pendente.';
    } else {
      encomenda_estados.forEach(element => {
        estado = element.estado;
      });
    }
    return estado;
  }

  cadastrarNovoEstado() {


    if (this.encomenda_estado.estado == '' || this.encomenda_estado.estado == '0') {

      this.sucess = false;
      this.erro = true;
      this.msg = 'Opção invalida';

      return;
    }

    console.log(Number.parseInt(sessionStorage.getItem('id')));

    this.encomenda_estado.funcionario = this.funcionario;
    this.encomenda_estado.encomenda = this.encomenda;

    this.encomenda_estado.funcionario.id = Number.parseInt(sessionStorage.getItem('id'));
    this.encomenda_estado.encomenda.id = this.encomenda.id;

    this.encomendaEstadoService.cadastrarEstado(this.encomenda_estado).subscribe(
      success => {
        this.erro = false;
        this.sucess = true;
        this.msg = 'Estado novo da encomenda adicionado com sucesso';
        alert('Estado novo da encomenda adicionado com sucesso');
        window.location.reload();
      },
      error => {
        this.sucess = false;
        this.erro = true;
        this.msg = 'Erro ao adicionar estado da encomenda doce';
        alert('Erro ao adicionar estado da encomenda doce');
      }
    )

  }

}
