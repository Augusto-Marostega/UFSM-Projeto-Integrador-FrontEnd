import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
import { ClienteService } from 'src/app/shared/services/cliente.service';
import { switchMap } from 'rxjs/operators';
import { Cliente } from 'src/app/shared/models/cliente.model';
import { Encomenda } from 'src/app/shared/models/encomenda.model';
import { Encomenda_doce } from 'src/app/shared/models/encomenda_doce.model';
import { Encomenda_estado } from 'src/app/shared/models/encomenda_estado.model';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.css']
})
export class DetalhesComponent implements OnInit {

  constructor(private rotaAtiva: ActivatedRoute, private clienteService: ClienteService) { }

  cliente: Cliente = new Cliente();
  encomenda: Encomenda = new Encomenda();
  encomendaId: number;

  ngOnInit(): void {


    this.clienteService.getCliente(Number.parseInt(sessionStorage.getItem('id')))
        .subscribe(dados =>{
           this.cliente = dados;
           this.encomendaId = this.rotaAtiva.snapshot.params['idEnco'];

          this.buscarEncomenda();
           
          });
          
    
  }


  buscarEncomenda(){
    this.encomenda = this.cliente.encomendas.find(encomenda => encomenda.id == this.encomendaId);
    console.log(this.encomendaId);
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
