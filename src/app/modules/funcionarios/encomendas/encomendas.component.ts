import { Component, OnInit } from '@angular/core';
import { Encomenda_doce } from 'src/app/shared/models/encomenda_doce.model';
import { EncomendaService } from 'src/app/shared/services/encomenda.service';
import { FuncionarioService } from 'src/app/shared/services/funcionario.service';
import { Funcionario } from 'src/app/shared/models/funcionario.model';
import { Encomenda } from 'src/app/shared/models/encomenda.model';
import { Encomenda_estado } from 'src/app/shared/models/encomenda_estado.model';

@Component({
  selector: 'app-encomendas',
  templateUrl: './encomendas.component.html',
  styleUrls: ['./encomendas.component.css']
})
export class EncomendasComponent implements OnInit {

  constructor(private encomendaService: EncomendaService,
    private funcionarioService: FuncionarioService) { }

    erro: boolean;
    sucess: boolean;
    msg: string;

  funcionario: Funcionario = new Funcionario();
  public encomendas: Encomenda[];

  ngOnInit(): void {

    this.erro = false;
    this.sucess = false;
    this.msg = '';


    this.encomendaService.getEncomendas().subscribe(dados => {
      this.encomendas = dados;
    });

    
    this.funcionarioService.getFuncionario(Number.parseInt(sessionStorage.getItem('id')))
      .subscribe(dados => this.funcionario = dados);

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

  getUltimoEstado(encomenda_estados: Encomenda_estado[]){
    let estado: string;
    if(encomenda_estados.length == 0){
      estado = 'Pendente.';
    }
    encomenda_estados.forEach(element => {
      estado = element.estado;
    });
    return estado;                 
  }

}
