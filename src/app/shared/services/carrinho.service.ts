import { Injectable } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';
import { DoceQtd } from '../models/doceQtd.model';


@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  constructor(private storage: SessionStorageService) { }

  addDoceCar(doce2: DoceQtd) {

    let doce = Object.assign({}, doce2);
    let mensagem = '';
    let existe: Boolean;
    existe = false;

    let listaCarrinho: DoceQtd[];
    listaCarrinho = this.storage.retrieve('carrinho');

    if (listaCarrinho == null) {
      listaCarrinho = [];
      listaCarrinho.push(doce);
      existe = true;

      mensagem = 'Item adicionado ao carrinho.';

    } else if (listaCarrinho && !existe) {
      for (var i = 0; i < listaCarrinho.length; i++) {
        if (listaCarrinho[i].id == doce.id) {
          //listaCarrinho.splice(i, 1);
          //listaCarrinho[i] = doce;  //modifica o doce (quantidade etc)
          //listaCarrinho.push(doce);
          //console.log('doce: ', listaCarrinho[i]);
          mensagem = 'Este item já esta no carrinho.';
          existe = true;
          break;
        }
      }
    }
    if (!existe) {
      listaCarrinho.push(doce);
      mensagem = 'Item adicionado ao carrinho.';
    }

    this.storage.clear('carrinho');
    this.storage.store('carrinho', listaCarrinho);
    return mensagem;
  }

  remDoceCar(doce: DoceQtd) {

    let listaCarrinho: DoceQtd[];
    listaCarrinho = this.storage.retrieve('carrinho');
    let mensagem = '';

    if (listaCarrinho) {
      for (var i = 0; i < listaCarrinho.length; i++) {
        if (listaCarrinho[i].id == doce.id) {
          listaCarrinho.splice(i, 1);  //exclui o doce da lista
          mensagem = 'Item removido do carrinho.';
          break;
        }
      }

      this.storage.clear('carrinho');
      this.storage.store('carrinho', listaCarrinho);
      return mensagem;
    }
  }

  editDoceCar(doce: DoceQtd){


    let listaCarrinho: DoceQtd[];
    listaCarrinho = this.storage.retrieve('carrinho');

    if (listaCarrinho == null) {
      listaCarrinho = [];

    } else if (listaCarrinho) {
      for (var i = 0; i < listaCarrinho.length; i++) {
        if (listaCarrinho[i].id == doce.id) {
          listaCarrinho[i] = doce;  //modifica o doce (quantidade etc)
          break;
        }
      }
    }

    this.storage.clear('carrinho');
    this.storage.store('carrinho', listaCarrinho);

  }

  getCarrinho(){
    let listaCarrinho: DoceQtd[];
    listaCarrinho = this.storage.retrieve('carrinho');
    //console.log(listaCarrinho);
    return listaCarrinho;
  }

  clearCarrinho(){
    this.storage.clear('carrinho');
  }

}
