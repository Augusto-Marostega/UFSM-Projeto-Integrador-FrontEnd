import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, take } from 'rxjs/operators';
import { Cliente } from 'src/app/shared/models/cliente.model';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private readonly API = 'http://localhost:8080/cliente';

  constructor(private http: HttpClient) { }

  cadastrar(cliente: Cliente){ 
    return this.http.post(`${this.API}/cadastrar`, cliente).pipe();
  }

  editar(cliente){
    return this.http.put(`${this.API}/editar`, cliente).pipe(take(1));
  }

  deletar(id){ 
    console.log('esse cliente:', id);
    return this.http.delete(`${this.API}/deletar/${id}`).pipe();
  }

  getCliente(id){ 
    return this.http.get<Cliente>(`${this.API}/${id}`).pipe(take(1));
  }
}
