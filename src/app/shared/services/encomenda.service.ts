import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Encomenda } from '../models/encomenda.model';
import { Encomenda_estado } from '../models/encomenda_estado.model';

@Injectable({
  providedIn: 'root'
})
export class EncomendaService {

  private readonly API = 'http://localhost:8080/encomenda';

  constructor(private http: HttpClient) { }

  cadastrar(encomenda: Encomenda){ 
    return this.http.post(`${this.API}/cadastrar`, encomenda).pipe();
  }

  cadastrarEstado(encomenda_estado: Encomenda_estado){
    return this.http.post(`http://localhost:8080/encomendaEstado/cadastrar`, encomenda_estado).pipe();
  }

  editar(encomenda){
    return this.http.put(`${this.API}/editar`, encomenda).pipe(take(1));
  }

  deletar(id){ 
    //console.log('esse cliente:', id);
    return this.http.delete(`${this.API}/deletar/${id}`).pipe();
  }

  getEncomenda(id){ 
    return this.http.get<Encomenda>(`${this.API}/${id}`).pipe(take(1));
  }
  getEncomendas(){
    return this.http.get<Encomenda[]>(`${this.API}/encomendas`);
  }

}
